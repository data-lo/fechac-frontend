'use server'

// 1. Librerías internas (acciones, helpers, etc.)
import { getCollection } from "@/actions/mongo/get-collection";

// 2. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";

// 3. Modelos locales
import { RestrictionDocument } from "../../models/restriction-document";

export default async function restrictionExists(character: string): Promise<ActionResponse<RestrictionDocument | null>> {
    try {
        if (!character || typeof character !== 'string' || character.trim() === '') {
            throw new Error('El parámetro character es requerido y debe ser un string válido');
        }

        const collection = await getCollection<RestrictionDocument>("restrictions");

        const response = await collection.findOne({ character: character });

        return {
            success: true,
            error: null,
            data: response,
        };
    } catch (error) {
        console.error('Error en action: get-pending-projects:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al obtener restricciones",
            data: null
        };
    }
}