'use server';

import { getCollection } from "@/actions/authentication-handler-action";
import { ActionResponse } from "@/interfaces/action/action-response";

import { CriterionDocument } from "../../../models/criterion-document";
import { UpdateOneResponse } from "@/interfaces/mongo/update-one-response";
import { ObjectId } from "mongodb";

export async function updateCriterion(values: CriterionDocument): Promise<ActionResponse<UpdateOneResponse>> {
    try {

        const collection = await getCollection<CriterionDocument>("document_prompts");

        const { _id, ...fieldsToUpdate } = values

        const response: UpdateOneResponse = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: fieldsToUpdate },
            { upsert: false }
        );

        if (response.modifiedCount === 0) {
            return {
                success: false,
                error: '¡No se actualizo el criterio solicitado!',
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: {
                ...response,
            },
        };

    } catch (error) {
        console.error('[update-criterion] Error en el action:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "¡Error desconocido al actualizar el criterio!",
            data: null
        };
    }
}
