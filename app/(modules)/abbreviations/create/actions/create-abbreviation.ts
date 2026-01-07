'use server'

// 1. Acciones / Servicios
import abbreviationExist from "../../actions/abbreviation-exist";

// 2. Librerías internas (acciones/helpers locales del módulo)
import { getDb } from "@/lib/get-db";


// 3. Interfaces
import { InsertOne } from "@/interfaces/mongo/insert-one";
import ActionResponse from "@/interfaces/action/action-response";

// 4. Modelos locales

export async function createAbbreviation(values: { name: string, abbreviation: string, type: string }): Promise<ActionResponse<InsertOne>> {
    try {
        const restriction = await abbreviationExist(values.abbreviation);
 

        if (restriction.success && restriction.data) {
            return {
                success: false,
                error: "¡Ya existe una abreviación de este tipo!",
                data: null
            };
        }

        const db = await getDb();

        const response: InsertOne = await db.abbreviations.insertOne({
            name: values.name,
            abbreviation: values.abbreviation,
            type: values.type,
            createdAt: new Date(),
            updatedAt: new Date()
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
        console.error('Error en action: create-abbreviation:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al crear la abreviación",
            data: null
        };
    }
}