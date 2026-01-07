'use server';

// 2. Interfaces
import ActionResponse from "@/interfaces/action/action-response";
import { DeleteOneResponse } from "@/interfaces/mongo/delete-one-response";

// 3. Modelos
import { ObjectId } from "mongodb";

// 4. Librerías
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/get-db";

export async function deleteAbbreviation(_id: string | ObjectId): Promise<ActionResponse<DeleteOneResponse>> {
    try {

        const db = await getDb();

        const response: DeleteOneResponse = await db.abbreviations.deleteOne({ _id: new ObjectId(_id) });

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
