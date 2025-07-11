'use server';

import { AccessRecord } from "@/interfaces/access-record";
import { MicrosoftTokenObject } from "@/interfaces/microsoft-token-object";
import { MicrosoftTokenResponse } from "@/interfaces/microsoft-token-response";
import { MicrosoftUserInfo } from "@/interfaces/microsoft-user-info";
import { getConnection } from "@/lib/mongodb";
import { LOGIN_SUCCESS_MESSAGE } from "@/messages/success-message";
import { Collection, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function handleMicrosoftAuthCallback(data: { code: string; sessionState: string }) {
  try {
    const db = await getConnection();
    const collection: Collection<AccessRecord> = db.collection("access");

    await collection.updateMany({ isLastAccess: true }, { $set: { isLastAccess: false } });

    const exist = await collection.findOne({ code: data.code });

    if (exist) return;

    const newAccessObject = await collection.insertOne({
      code: data.code,
      sessionState: data.sessionState,
      createdAt: new Date(),
      isLastAccess: true,
    });

    await exchangeCodeForToken(data.code, newAccessObject.insertedId);

    return {
      status: 200,
      message: LOGIN_SUCCESS_MESSAGE
    }

  } catch (error: any) {
    console.error("Error al guardar el access:", error);
    throw error;
  }
}

export async function exchangeCodeForToken(code: string, accessId: ObjectId): Promise<void> {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET_VALUE!,
    code,
    redirect_uri: process.env.REDIRECT_URI!,
    grant_type: 'authorization_code',
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
    console.error('Token exchange failed:', errorBody);
    throw new Error('No se pudo obtener el token de Microsoft');
  }

  const responseParsed = await response.json();

  await storeMicrosoftToken(responseParsed, accessId);
}

export async function storeMicrosoftToken(data: MicrosoftTokenResponse, accessId: ObjectId) {
  try {
    const db = await getConnection();

    const collection: Collection<MicrosoftTokenObject> = db.collection("session");

    await collection.insertOne({
      access_token: data.access_token,
      expires_in: data.expires_in,
      ext_expires_in: data.ext_expires_in,
      refresh_token: data.refresh_token,
      scope: data.scope,
      token_type: data.token_type,
      accessId: accessId
    });


  } catch (error: any) {
    throw new Error('No se pudo obtener la session');
  }
}


export async function getSession(): Promise<MicrosoftTokenObject | null | undefined> {
  try {
    const db = await getConnection();

    const accessCollection: Collection<AccessRecord> = db.collection("access");
    const sessionCollection: Collection<MicrosoftTokenObject> = db.collection("session");

    const access = await accessCollection.findOne({
      isLastAccess: true
    });

    if (!access) {
      return undefined
    }

    const session = await sessionCollection.findOne({
      accessId: access._id
    });

    return session ?? null;

  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}
export async function getUserInformation() {
  const session = await getSession();

  if (!session) {
    console.log('Erorrre')
    return
  }

  const response = await fetch(`https://graph.microsoft.com/v1.0/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },

  });

  if (!response.ok) {
    // const errorBody = await response.text();
    // console.error('Token exchange failed:', errorBody);
    // throw new Error('No se pudo obtener el token de Microsoft');
    return undefined;
  }

  return await response.json() as MicrosoftUserInfo;;
}


export async function handleLogout(): Promise<GeneralResponse> {

  const db = await getConnection();

  const collection: Collection<AccessRecord> = db.collection("access");

  await collection.updateMany({ isLastAccess: true }, { $set: { isLastAccess: false } });

  revalidatePath("/nomenclature");

  return {
    status: 200,
    message: 'La sesión se ha cerrrado correctamente!'
  }
}