
import { getDb } from "@/lib/get-db";
import ActionResponse from "@/interfaces/action/action-response";
import { AbbreviationDocument } from "../models/abbreviation-document";

export default async function abbreviationExist(abbreviation: string): Promise<ActionResponse<AbbreviationDocument>> {
    try {
        if (!abbreviation || typeof abbreviation !== 'string' || abbreviation.trim() === '') {
            throw new Error('El parámetro abreviación es requerido y debe ser un string válido');
        }

        const db = await getDb()

        const response = await db.abbreviations.findOne({ abbreviation: abbreviation });

        return {
            success: true,
            error: null,
            data: response
        }

    } catch (error) {
        console.error('Error en action: abbreviation-exist:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al obtener restricciones",
            data: null
        };
    }

}