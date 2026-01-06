'use server'

// 1. Librerías externas

// 2. Librerías internas (acciones/helpers locales del módulo)
import getCollection from "@/actions/mongo/get-collection";

// 3. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one";

// 4. Modelos locales
import { Restriction } from "../../models/restriction";

// 5. Acciones / Servicios
import { restrictionExists } from "../../actions/restriction-exists";



export async function createRestriction(values: { character: string }): Promise<ActionResponse<InsertOneResponse>> {
    try {
        const restriction = await restrictionExists(values.character);

        if (restriction.success && restriction.data) {
            return {
                success: false,
                error: "¡Ya existe una restricción con este carácter!",
                data: null
            };
        }

        const collection = await getCollection<Restriction>("restrictions");

        const response: InsertOneResponse = await collection.insertOne({
            character: values.character.trim(),
            status: true,
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
        console.error('Error en action: create-restriction:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al crear la restricción",
            data: null
        };
    }
}