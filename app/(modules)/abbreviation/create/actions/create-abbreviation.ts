'use server'

// 1. Librerías externas
import { revalidatePath } from "next/cache";

// 2. Librerías internas (acciones/helpers locales del módulo)
import { getCollection } from "@/actions/mongo/get-collection";

// 3. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one-response";
import { abbreviationExist } from "../../actions/abbreviation-exist";
import { Abbreviation } from "../../models/abbreviation";


// 4. Modelos locales


export async function createAbbreviation(values: { character: string }): Promise<ActionResponse<InsertOneResponse>> {
    try {
        const restriction = await abbreviationExist(values.character);


        if (restriction.success && restriction.data) {
            return {
                success: false,
                error: "¡Ya existe una restricción con este carácter!",
                data: null
            };
        }

        const collection = await getCollection<Abbreviation>("abbreviations");

        const response: InsertOneResponse = await collection.insertOne({
            abbreviation: "",
            name: ""
        });

        const serialized = {
            ...response,
            insertedId: response.insertedId.toString(),
        }

        return {
            success: true,
            error: null,
            data: serialized
        };

    } catch (error) {
        console.error('Error en action: create-restriction:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al crear la restricción",
            data: null
        };
    }
}