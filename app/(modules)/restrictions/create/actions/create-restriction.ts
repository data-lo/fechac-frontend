'use server'

// 1. Librerías externas
import { revalidatePath } from "next/cache";

// 2. Librerías internas (acciones/helpers locales del módulo)

import { getCollection } from "@/actions/moongo/get-collection";

// 3. Interfaces
import { ActionResponse } from "@/interfaces/action/action-response";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one-response";

// 4. Modelos locales
import { Restriction } from "../../models/restriction";

import restrictionExists from "./restriction-exists";

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

        const response = await collection.insertOne({
            character: values.character.trim(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return {
            success: true,
            error: null,
            data: response
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