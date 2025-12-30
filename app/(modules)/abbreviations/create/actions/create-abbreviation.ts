'use server'

// 1. Acciones / Servicios
import abbreviationExist from "../../actions/abbreviation-exist";

// 2. Librerías internas (acciones/helpers locales del módulo)
import getCollection from "@/actions/mongo/get-collection";

// 3. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one-response";

// 4. Modelos locales
import { Abbreviation } from "../../models/abbreviation";

export async function createAbbreviation(values: { name: string, abbreviation: string, type: string }): Promise<ActionResponse<InsertOneResponse>> {
    try {
        const restriction = await abbreviationExist(values.abbreviation);
 

        if (restriction.success && restriction.data) {
            return {
                success: false,
                error: "¡Ya existe una abreviación de este tipo!",
                data: null
            };
        }

        const collection = await getCollection<Abbreviation>("abbreviations");

        const response: InsertOneResponse = await collection.insertOne({
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