'use server'

// 1. Acciones / Servicios
import getDb from "@/infrastructure/persistence/mongo/get-db";


// 3. Librerías externas
import { ObjectId } from "mongodb";

// 4. Utilidades de framework
import { revalidatePath } from "next/cache";

// 5. Interfaces
import { UpdateOne } from "@/interfaces/mongo/update-one";
import ActionResponse from "@/interfaces/action/action-response";

export async function toggleRestrictionStatus(values: { _id: string, status: boolean }): Promise<ActionResponse<UpdateOne>> {
    try {

        const db = await getDb();

        const filter = { _id: new ObjectId(values._id) };

        const update = {
            $set: {
                status: !values.status,
            },
        };

        const response: UpdateOne = await db.restrictions.updateOne(filter, update);

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
            error: error instanceof Error ? error.message : "Error desconocido al modificar el estatus",
            data: null
        };
    }
}
