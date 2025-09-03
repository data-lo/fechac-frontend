'use server';

// 1. Acciones internas / helpers
import { getCollection } from "@/actions/authentication-handler-action";

// 2. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { DeleteOneResponse } from "@/interfaces/mongo/delete-one-response";

// 3. Modelos
import { CriterionDocument } from "../../models/criterion-document";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteCriterion(_id: string | ObjectId): Promise<ActionResponse<DeleteOneResponse>> {
    try {

        const collection = await getCollection<CriterionDocument>("document_prompts");

        const response: DeleteOneResponse = await collection.deleteOne({ _id: new ObjectId(_id) });

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
