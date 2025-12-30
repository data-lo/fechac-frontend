"use server"
// Librerías externas
import { ObjectId } from "mongodb";

// Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { DeleteOneResponse } from "@/interfaces/mongo/delete-one-response";

// Acciones / Servicios
import getCollection from "@/actions/mongo/get-collection";

// Modelos
import { RestrictionDocument } from "../../models/restriction-document";

export async function deleteRestriction(values: { _id: string }): Promise<ActionResponse<DeleteOneResponse>> {
    try {
        const collection = await getCollection<RestrictionDocument>("restrictions");

        const response: DeleteOneResponse = await collection.deleteOne({ _id: new ObjectId(values._id) });

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