'use server'

// 3. Interfaces
import { InsertOne } from "@/interfaces/mongo/insert-one";
import ActionResponse from "@/interfaces/action/action-response";


// 5. Acciones / Servicios
import { restrictionExists } from "./restriction-exists";
import getDb from "@/infrastructure/persistence/mongo/get-db";



export async function createRestriction(values: { character: string }): Promise<ActionResponse<InsertOne>> {
    try {
        const restriction = await restrictionExists(values.character);

        if (restriction.success && restriction.data) {
            return {
                success: false,
                error: "¡Ya existe una restricción con este carácter!",
                data: null
            };
        }

        const db = await getDb();

        const response: InsertOne = await db.restrictions.insertOne({
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