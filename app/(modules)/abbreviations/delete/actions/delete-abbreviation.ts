'use server';

// 1. Acciones internas / helpers
import getCollection from "@/actions/mongo/get-collection";

// 2. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { DeleteOneResponse } from "@/interfaces/mongo/delete-one-response";

// 3. Modelos
import { AbbreviationDocument } from "../../models/abbreviation-document";
import { ObjectId } from "mongodb";

// 4. Librerías
import { revalidatePath } from "next/cache";

export async function deleteAbbreviation(_id: string | ObjectId): Promise<ActionResponse<DeleteOneResponse>> {
    try {

        const collection = await getCollection<AbbreviationDocument>("abbreviations");

        const response: DeleteOneResponse = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (!response.acknowledged || response.deletedCount === 0) {
            return {
                success: false,
                error: "No se pudo eliminar el la abreviación",
                data: null,
            };
        }

        revalidatePath("/abbreviations");

        return {
            success: true,
            error: null,
            data: response,
        };
    } catch (error) {
        console.error('Error en action: delete-abbreviation:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al elimianr la abreviación",
            data: null
        };
    }
}
