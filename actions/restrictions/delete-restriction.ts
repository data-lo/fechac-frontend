"use server"
// Librerías externas
import { ObjectId } from "mongodb";

// Interfaces

import { DeleteOne } from "@/interfaces/mongo/delete-one";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import ActionResponse from "@/interfaces/action/action-response";


export async function deleteRestriction(values: { _id: string }): Promise<ActionResponse<DeleteOne>> {
    try {
        const db = await getDb();

        const response: DeleteOne = await db.restrictions.deleteOne({ _id: new ObjectId(values._id) });

        if (response.deletedCount === 0) {
            return {
                success: false,
                error: "¡No se pudo eliminar la restricción!",
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: response
        };


    } catch (error) {
        console.error('Error en action: delete-restriction:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al actualizar la restricción",
            data: null
        };
    }
}