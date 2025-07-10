// 'use server'

// import { AccessRecord } from "@/interfaces/session-interface";
// import { getConnection } from "@/lib/mongodb";
// import { Collection } from 'mongodb';


// export async function handleMicrosoftAuthCallback(data: { code: string, sessionState: string }) {

//     try {
//         const db = await getConnection();

//         db.createCollection('access');

//         const collection = await db.collection<AccessRecord>('access');

//         await collection.updateMany(
//             { isLastAccess: true },
//             { $set: { isLastAccess: false } }
//         );

//         const exist = await collection.findOne({
//             code: data.code
//         });

//         if (exist) return;

//         await db.collection('access').insertOne({
//             data,
//             createdAt: new Date(),
//             isLastAccess: true
//         })

//     } catch (error: any) {
//         console.error("Error al guardar la sesión:", error);
//         throw error;
//     }

// }


'use server';

import { AccessRecord } from "@/interfaces/session-interface";
import { getConnection } from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";

export async function handleMicrosoftAuthCallback(data: { code: string; sessionState: string }) {
  try {
    const db = await getConnection();
    const collection: Collection<AccessRecord> = db.collection("access");

    await collection.updateMany({ isLastAccess: true }, { $set: { isLastAccess: false } });

    const exist = await collection.findOne({ code: data.code });
    if (exist) return;

    await collection.insertOne({
      code: data.code,
      sessionState: data.sessionState,
      createdAt: new Date(),
      isLastAccess: true,
    });

    // Solicitar el token

  } catch (error: any) {
    console.error("Error al guardar la sesión:", error);
    throw error;
  }
}

export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  id_token: string;
}> {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    code,
    redirect_uri: process.env.REDIRECT_URI!,
    grant_type: 'authorization_code',
  });

  const res = await fetch(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Token exchange failed:', errorBody);
    throw new Error('No se pudo obtener el token de Microsoft');
  }

  const tokens = await res.json();
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    id_token: tokens.id_token,
  };
}
