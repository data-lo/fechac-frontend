'use server'

// 1. Infrastructure / Persistence
import getDb from "@/infrastructure/persistence/mongo/get-db";

// 2. Interfaces
import ActionResponse from "@/interfaces/action/action-response";

// 3. Domain models / Documents
import RestrictionDocument from "@/models/restrictions/restriction-document";

export async function restrictionExists(character: string): Promise<ActionResponse<RestrictionDocument>> {
    try {
        if (!character || typeof character !== 'string' || character.trim() === '') {
            throw new Error('El parámetro character es requerido y debe ser un string válido');
        }

        const db = await getDb();

        const response = await db.restrictions.findOne({ character: character });

        return {
            success: true,
            error: null,
            data: response,
        };
    } catch (error) {
        console.error('Error en action: restriction-exists:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al obtener restricciones",
            data: null
        };
    }
}