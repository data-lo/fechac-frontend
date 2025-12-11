'use server';


import { ActionResponse } from "@/interfaces/action/action-response";


import { UpdateOneResponse } from "@/interfaces/mongo/update-one-response";
import { ObjectId } from "mongodb";
import getCollection from "@/actions/mongo/get-collection";
import { DocumentEntity } from "../models/document-entity";

export async function updateDocumentAction(values: DocumentEntity): Promise<ActionResponse<UpdateOneResponse>> {
    try {

        const collection = await getCollection<DocumentEntity>("documents");

        const { _id, ...fieldsToUpdate } = values

        const response: UpdateOneResponse = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: fieldsToUpdate },
            { upsert: false }
        );

        if (response.modifiedCount === 0) {
            return {
                success: false,
                error: "¡No se actualizo el documento solicitado!",
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
        console.error('[update-documents] Error en el action:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "¡Error desconocido al actualizar el documento!",
            data: null
        };
    }
}