'use server';

import { getCollection } from "@/actions/authentication-handler-action";
import { ActionResponse } from "@/interfaces/action/action-response";
import { CriterionDocument } from "../../models/criterion-document";
import { ObjectId } from "mongodb";

export async function getCriterion(_id: string): Promise<ActionResponse<{ criterion: CriterionDocument; }>> {
    try {
        const collection = await getCollection<CriterionDocument>("document_prompts");

        const criterion = await collection.findOne({ _id: new ObjectId(_id) });

        if (!criterion) {
            return {
                success: false,
                error: '¡No se encontró el criterio solicitado!',
                data: null
            };
        }

        const newStructure = {
            ...criterion,
            _id: criterion._id.toString(),
        }

        return {
            success: true,
            error: null,
            data: {
                criterion: newStructure,
            },
        };

    } catch (error) {
        console.error('[get-criterion] Error en el action:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "¡Error desconocido al obtener el criterio!",
            data: null
        };
    }
}
