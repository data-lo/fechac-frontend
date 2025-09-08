import { ActionResponse } from "@/interfaces/action/action-response";

import { AbbreviationDocument } from "../models/abbreviation-document";
import { getCollection } from "@/actions/mongo/get-collection";

export default async function abbreviationExist(abbreviation: string): Promise<ActionResponse<AbbreviationDocument>> {
    try {
        if (!abbreviation || typeof abbreviation !== 'string' || abbreviation.trim() === '') {
            throw new Error('El parámetro abreviación es requerido y debe ser un string válido');
        }

        const collection = await getCollection<AbbreviationDocument>("abbreviations");

        const response = await collection.findOne({ abbreviation: abbreviation });

        return {
            success: true,
            error: null,
            data: response
        }

    } catch (error) {
        console.error('Error en action: get-pending-projects:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al obtener restricciones",
            data: null
        };
    }

}