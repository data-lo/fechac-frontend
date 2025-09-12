'use server';

import { ObjectId, Document } from "mongodb";

import { revalidatePath } from "next/cache";

import { getExpirationDate } from "@/functions/get-expiration-date";

import { AccessRecord } from "@/interfaces/access-record";
import { MicrosoftSessionObject } from "@/interfaces/microsoft-token-object";
import { MicrosoftTokenResponse } from "@/interfaces/microsoft-token-response";
import { MicrosoftUserInfo } from "@/interfaces/microsoft-user-info";

import { LOGIN_SUCCESS_MESSAGE } from "@/messages/success-message";
import getCollection from "./mongo/get-collection";


export async function handleMicrosoftAuthCallback(data: { code: string }): Promise<GeneralResponse> {
  try {

    await desactivateAccessRecords({ isLastAccess: true }, { isLastAccess: false });

    const newAccessObject = await createAccessRecord({ code: data.code });

    const newMicrosoftObject = await exchangeCodeForToken(data.code, new ObjectId(newAccessObject._id));

    await storeMicrosoftToken(newMicrosoftObject)

    return {
      status: 200,
      message: LOGIN_SUCCESS_MESSAGE
    }

  } catch (error: any) {
    console.error("❌ Error al intentar manejar el token de autenticación:", error);
    throw error;
  }
}

export async function desactivateAccessRecords<T extends Document>(
  filter: Partial<T>,
  update: Partial<T>
): Promise<void> {
  try {
    const collection = await getCollection<AccessRecord>("access");

    const result = await collection.updateMany(filter, { $set: update } as any);

    if (result.modifiedCount === 0) console.warn('No se actualizo un ningún documento AccessRecord.');

  } catch (error: any) {
    console.error("❌ Error al actualizar los documentos AccessRecord:", error);
    throw new Error('Ocurrió un error al intentar actualizar los documentos AccessRecord.');
  }
}


export async function createAccessRecord(data: { code: string }): Promise<{ _id: string }> {
  try {
    const collection = await getCollection<AccessRecord>("access");

    const currentDate = new Date();

    const newDocument = await collection.insertOne({
      code: data.code,
      createdAt: currentDate,
      isLastAccess: true,
    });

    if (!newDocument.insertedId) {
      throw new Error('Ocurrió un error al intentar crear el documento AccessRecord.');
    }

    return { _id: newDocument.insertedId.toString() }

  } catch (error: any) {
    console.error("❌ Error al crear el documento AccessRecord:", error);
    throw new Error('Ocurrió un error al intentar crear el documento AccessRecord.');
  }
}


export async function exchangeCodeForToken(code: string, access_id: ObjectId): Promise<MicrosoftSessionObject> {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET_VALUE!,
    code,
    redirect_uri: process.env.REDIRECT_URI!,
    grant_type: 'authorization_code',
    scope: 'https://graph.microsoft.com/User.Read https://graph.microsoft.com/Files.Read offline_access'

  });

  const response = await fetch(`https://login.microsoftonline.com/common/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });


  if (!response.ok) {
    const errorBody = await response.text();
    console.error("❌ Falló el intercambio de código por token en Microsoft OAuth:", errorBody);
    throw new Error('No se pudo obtener el token de Microsoft');
  }

  const responseInJSON: MicrosoftTokenResponse = await response.json();

  return { access_id, ...responseInJSON, };
}

export async function storeMicrosoftToken(data: MicrosoftSessionObject): Promise<{ _id: string }> {
  try {

    const collection = await getCollection<MicrosoftSessionObject>("session");

    const newDocument = await collection.insertOne({
      access_token: data.access_token,
      expires_in: data.expires_in,
      ext_expires_in: data.ext_expires_in,
      refresh_token: data.refresh_token,
      scope: data.scope,
      token_type: data.token_type,
      created_at: new Date(),
      renewed_token_expiration_date: getExpirationDate(data.expires_in),
      isLastTokenObtenaided: true,
      access_id: data.access_id
    });

    if (!newDocument.insertedId) {
      throw new Error('Ocurrió un error al intentar crear el documento MicrosoftSessionObject.');
    }

    return { _id: newDocument.insertedId.toString() }

  } catch (error: any) {
    console.error("❌ Error al crear el documento MicrosoftSessionObject:", error);
    throw new Error('Ocurrió un error al intentar crear el documento MicrosoftSessionObject.');
  }
}


export async function getSession(): Promise<MicrosoftSessionObject | null> {
  try {
    const accessCollection = await getCollection<AccessRecord>("access");

    const sessionCollection = await getCollection<MicrosoftSessionObject>("session");

    const access = await accessCollection.findOne({ isLastAccess: true });

    if (!access) return null;

    let session = await sessionCollection.findOne({ access_id: access._id, isLastTokenObtenaided: true });

    if (!session) return null;

    let newMicrosoftObject;

    if (session.created_at && session.renewed_token_expiration_date && new Date(session.renewed_token_expiration_date) < new Date()) {
      newMicrosoftObject = await extendedDurationSession(session.refresh_token, access.code);

      await desactivatePreviousSessions(access._id);

      await storeMicrosoftToken(newMicrosoftObject);

      session = await sessionCollection.findOne({ access_id: access._id, isLastTokenObtenaided: true });
    }

    return session;
  } catch (error) {
    console.error("❌ Error al recuperar la sesión:", error);
    throw new Error("No se pudo recuperar la sesión activa.");
  }
}

export async function getUserInformation(): Promise<MicrosoftUserInfo | null> {

  const session = await getSession();

  if (!session) return null;

  const response = await fetch(`https://graph.microsoft.com/v1.0/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },

  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("❌ Error al obtener la información del usuario desde Microsoft Graph:", errorBody);
    return null
  }

  const user: MicrosoftUserInfo = await response.json();

  return user;
}


export async function handleLogout(): Promise<GeneralResponse> {
  await desactivateAccessRecords({ isLastAccess: true }, { isLastAccess: false });

  revalidatePath("/session");

  return {
    status: 200,
    message: 'La sesión se ha cerrrado correctamente'
  }
}


export async function extendedDurationSession(refreshToken: string, access_id: string): Promise<MicrosoftSessionObject> {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET_VALUE!,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Extent token exchange failed:', errorBody);
    throw new Error('No se pudo obtener el nuevo token de Microsoft');
  }

  const responseInJSON = await response.json();
  return { ...responseInJSON, access_id }
}

export async function desactivatePreviousSessions(access_id: ObjectId) {
  const collection = await getCollection<MicrosoftSessionObject>('session');


  const result = await collection.updateMany(
    { isLastTokenObtenaided: true, access_id: access_id },
    { $set: { isLastTokenObtenaided: false } }
  );

  if (result.modifiedCount === 0) console.warn('No se actualizo un ningún documento SessionRecord.');
}