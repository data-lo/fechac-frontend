'use server';

import { isMicrosoftGraphError } from "@/guard/is-microsoft-error-graph";
import { AccessRecord } from "@/interfaces/access-record";
import { MicrosoftTokenObject } from "@/interfaces/microsoft-token-object";
import { MicrosoftTokenResponse } from "@/interfaces/microsoft-token-response";
import { MicrosoftUserInfo } from "@/interfaces/microsoft-user-info";
import { getConnection } from "@/lib/mongodb";
import { LOGIN_SUCCESS_MESSAGE } from "@/messages/success-message";
import { Collection, ObjectId, Db, Document } from "mongodb";
import { revalidatePath } from "next/cache";

export async function handleMicrosoftAuthCallback(data: { code: string; sessionState: string }): Promise<GeneralResponse> {
  try {

    await desactivateAccessRecords({ isLastAccess: true }, { isLastAccess: false });

    const newAccessObject = await createAccessRecord({ code: data.code, sessionState: data.sessionState });

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

    if (result.modifiedCount === 0) {
      throw new Error('Ocurrió un error al intentar actualizar el documento AccessRecord.');
    }

  } catch (error: any) {
    console.error("❌ Error al actualizar los documentos AccessRecord:", error);
    throw new Error('Ocurrió un error al intentar actualizar los documentos AccessRecord.');
  }
}


export async function createAccessRecord(data: { code: string; sessionState: string }): Promise<{ _id: string }> {
  try {
    const collection = await getCollection<AccessRecord>("access");

    const currentDate = new Date();

    const newDocument = await collection.insertOne({
      code: data.code,
      sessionState: data.sessionState,
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

export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  try {
    const db: Db = await getConnection();
    return db.collection<T>(name);
  } catch (error) {
    console.error("Error al obtener la colección:", error);
    throw error;
  }
}

export async function exchangeCodeForToken(code: string, accessId: ObjectId): Promise<MicrosoftTokenObject> {
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
    console.error("❌ Falló el intercambio de código por token en Microsoft OAuth:", errorBody);
    throw new Error('No se pudo obtener el token de Microsoft');
  }

  const responseInJSON: MicrosoftTokenResponse = await response.json();

  return { accessId, ...responseInJSON, };
}

export async function storeMicrosoftToken(data: MicrosoftTokenObject): Promise<{ _id: string }> {
  try {

    const collection = await getCollection<MicrosoftTokenObject>("session");

    const newDocument = await collection.insertOne({
      access_token: data.access_token,
      expires_in: data.expires_in,
      ext_expires_in: data.ext_expires_in,
      refresh_token: data.refresh_token,
      scope: data.scope,
      token_type: data.token_type,
      accessId: data.accessId
    });

    if (!newDocument.insertedId) {
      throw new Error('Ocurrió un error al intentar crear el documento MicrosoftTokenObject.');
    }

    return { _id: newDocument.insertedId.toString() }

  } catch (error: any) {
    console.error("❌ Error al crear el documento MicrosoftTokenObject:", error);
    throw new Error('Ocurrió un error al intentar crear el documento MicrosoftTokenObject.');
  }
}


export async function getSession(): Promise<MicrosoftTokenObject> {
  try {
    const accessCollection = await getCollection<AccessRecord>("access");

    const sessionCollection = await getCollection<MicrosoftTokenObject>("session");

    const access = await accessCollection.findOne({ isLastAccess: true });

    if (!access) {
      throw new Error("No se encontró ningún registro de acceso reciente.");
    }

    const session = await sessionCollection.findOne({ accessId: access._id });

    if (!session) {
      throw new Error("No se encontró una sesión asociada al último código de acceso.");
    }

    // const validateSession = await getUserInformation();

    // if (isMicrosoftGraphError(validateSession)) {
    //   console.log("Si esta validando la sesión:");
    //   // manejar error personalizado
    // }

    return session;
  } catch (error) {
    console.error("❌ Error al recuperar la sesión:", error);
    throw new Error("No se pudo recuperar la sesión activa.");
  }
}

export async function getUserInformation(): Promise<MicrosoftUserInfo> {
  const session = await getSession();

  const response = await fetch(`https://graph.microsoft.com/v1.0/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },

  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.log(errorBody)
    console.error("❌ Error al obtener la información del usuario desde Microsoft Graph:", errorBody);
    throw new Error("No se pudo recuperar la información del usuario desde Microsoft.");
  }

  const user: MicrosoftUserInfo = await response.json();

  return user;
}


export async function handleLogout(): Promise<GeneralResponse> {
  await desactivateAccessRecords({ isLastAccess: true }, { isLastAccess: false });

  revalidatePath("/nomenclature");

  return {
    status: 200,
    message: 'La sesión se ha cerrrado correctamente'
  }
}


export async function extendedDurationSession(refreshToken: string): Promise<void> {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET_VALUE!,
    refresh_token: refreshToken,
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
    console.error('Extent token exchange failed:', errorBody);
    throw new Error('No se pudo obtener el nuevo token de Microsoft');
  }

  const responseParsed = await response.json();
}
