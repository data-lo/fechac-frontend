'use server';

import { getCollection } from "@/actions/authentication-handler-action";
import { ActionResponse } from "@/interfaces/action/action-response";
import { Criterion } from "../../models/criterion";
import { InsertResponse } from "@/interfaces/mongo/insert-response";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one-response";

export async function createCriterion(criterion: Criterion): Promise<ActionResponse<InsertOneResponse>> {
    try {

        const collection = await getCollection<Criterion>("document_prompts");

        const response: InsertOneResponse = await collection.insertOne(criterion);

        if (!response.acknowledged) {
            return {
                success: false,
                error: "La inserción no fue reconocida por MongoDB",
                data: null,
            };
        }

        const serialize = {
            insertedId: response.insertedId.toString(),
            acknowledged: response.acknowledged,
        };

        return {
            success: true,
            error: null,
            data: serialize,
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
