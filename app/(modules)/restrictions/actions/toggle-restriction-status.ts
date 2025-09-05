'use server'

// 1. Acciones / Servicios
import { getCollection } from "@/actions/mongo/get-collection";

// 2. Modelos
import { RestrictionDocument } from "../models/restriction-document";

// 3. Librerías externas
import { ObjectId } from "mongodb";

// 4. Utilidades de framework
import { revalidatePath } from "next/cache";

// 5. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { UpdateOneResponse } from "@/interfaces/mongo/update-one-response";

export async function toggleRestrictionStatus(values: { _id: string, status: boolean }): Promise<ActionResponse<UpdateOneResponse>> {
    try {

        const collection = await getCollection<RestrictionDocument>("restrictions");

        const filter = { _id: new ObjectId(values._id) };

        const update = {
            $set: {
                status: !values.status,
            },
        };

        const response: UpdateOneResponse = await collection.updateOne(filter, update);

        if (response.modifiedCount === 0) {
            return {
                success: false,
                error: "¡No se pudo cambiar el estatus de la restricción!",
                data: null
            };
        }

        revalidatePath("/restrictions");

        return {
            success: true,
            error: null,
            data: response
        };

    } catch (error) {
       console.error('Error en action: toggle-restriction-status:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al cambiar",
            data: null
        };
    }
}
