"use server";

// 1. Infrastructure / persistence
import getDb from "@/infrastructure/persistence/mongo/get-db";

// 2. Interfaces
import ActionResponse from "@/interfaces/action/action-response";
import { DeleteOne } from "@/interfaces/mongo/delete-one";

// 3. Domain / database types
import { ObjectId } from "mongodb";

// 4. Framework / platform libraries
import { revalidatePath } from "next/cache";

export async function deleteCriterion(_id: string | ObjectId): Promise<ActionResponse<DeleteOne>> {
    try {

        const db = await getDb();

        const response: DeleteOne = await db.criteria.deleteOne({ _id: new ObjectId(_id) });

        if (!response.acknowledged || response.deletedCount === 0) {
            return {
                success: false,
                error: "No se pudo eliminar el criterio.",
                data: null,
            };
        }

        revalidatePath("/criteria");

        return {
            success: true,
            error: null,
            data: response,
        };


    } catch (error) {
        console.error('Error en createCriterion:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al crear un criterio",
            data: null
        };
    }
}
