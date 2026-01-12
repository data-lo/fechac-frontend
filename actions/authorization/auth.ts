'use server';
// Funciones y utilidades del framework
import { revalidatePath } from "next/cache";

// Funciones locales
import { getExpirationDate } from "@/functions/get-expiration-date";

// Interfaces
import { Microsoft } from "@/models/microsoft/microsoft";
import { MicrosoftToken } from "@/interfaces/microsoft/microsoft-token";
import { MicrosoftUserInformation } from "@/interfaces/microsoft/microsoft-user-information";

// Constantes / Mensajes
import { LOGIN_SUCCESS_MESSAGE } from "@/messages/success-message";
import getDb from "@/infrastructure/persistence/mongo/get-db";

export async function handleMicrosoftAuthCallback(params: { code: string }): Promise<GeneralResponse> {
    try {
        await deactivatePreviousSessions();

        const microsoftToken = await exchangeAuthCodeForToken(params.code);

        await saveMicrosoftToken(microsoftToken);

        return {
            status: 200,
            message: LOGIN_SUCCESS_MESSAGE,
        };
    } catch (error) {
        console.error("Error al manejar el callback de autenticación de Microsoft:", error);
        throw error;
    }
}

export async function exchangeAuthCodeForToken(code: string): Promise<Microsoft> {
    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET_VALUE!,
        code,
        redirect_uri: process.env.REDIRECT_URI!,
        grant_type: 'authorization_code',
        scope: 'https://graph.microsoft.com/User.Read https://graph.microsoft.com/Files.ReadWrite offline_access',
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
        console.error("Falló el intercambio de código por token en Microsoft OAuth:", errorBody);
        throw new Error('No se pudo obtener el token de Microsoft');
    }



    const responseInJSON: MicrosoftToken = await response.json();

    return { code, ...responseInJSON, };
}

export async function saveMicrosoftToken(data: Microsoft): Promise<{ _id: string }> {
    try {
        const db = await getDb();

        const newDocument = await db.microsoft.insertOne({
            access_token: data.access_token,
            expires_in: data.expires_in,
            ext_expires_in: data.ext_expires_in,
            refresh_token: data.refresh_token,
            scope: data.scope,
            token_type: data.token_type,
            created_at: new Date(),
            renewed_token_expiration_date: getExpirationDate(data.expires_in),
            is_last_token_obtained: true,
            code: data.code
        });

        if (!newDocument.insertedId) {
            throw new Error('Ocurrió un error al intentar crear el documento MicrosoftSessionObject.');
        }

        return { _id: newDocument.insertedId.toString() }

    } catch (error: any) {
        console.error("Error al crear el documento MicrosoftSessionObject:", error);
        throw new Error('Ocurrió un error al intentar crear el documento MicrosoftSessionObject.');
    }
}


export async function getActiveMicrosoftSession(): Promise<Microsoft | null> {
    try {
        const db = await getDb();

        const activeSession = await db.microsoft.findOne({ is_last_token_obtained: true });

        if (!activeSession) return null;

        return activeSession;
    } catch (error) {
        console.error("Error al recuperar la sesión activa:", error);
        throw new Error("No se pudo recuperar la sesión activa.");
    }
}

export async function getUserInformation(): Promise<MicrosoftUserInformation | null> {

    const session = await getActiveMicrosoftSession();

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

    const user: MicrosoftUserInformation = await response.json();

    return user;
}


export async function handleLogout(): Promise<GeneralResponse> {
    await deactivatePreviousSessions();

    revalidatePath("/session");

    return {
        status: 200,
        message: 'La sesión se ha cerrrado correctamente'
    }
}


export async function extendedDurationSession(refreshToken: string, access_id: string): Promise<Microsoft> {
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

export async function deactivatePreviousSessions() {

    const db = await getDb();

    const result = await db.microsoft.updateMany(
        { is_last_token_obtained: true },
        { $set: { is_last_token_obtained: false } }
    );

    if (result.modifiedCount === 0) console.warn('No se actualizo un ningún documento Microsoft Session.');
}
