'use server';
import { ObjectId } from "mongodb";

import getCollection from "@/actions/mongo/get-collection";

import { DocumentEntity } from "../models/document-entity";
import { ActionResponse } from "@/interfaces/action/action-response";

export default async function getDocumentAction(_id: string): Promise<ActionResponse<{ document: DocumentEntity; }>> {
    try {
        const collection = await getCollection<DocumentEntity>("documents");
        
        if (!ObjectId.isValid(_id)) {
            return {
                success: false,
                error: "¡ID inválido!",
                data: null
            }
        }

        const document = await collection.findOne({ _id: new ObjectId(_id) });

        if (!document){
            return {
                success: false,
                error: "¡No se encontró el documento solicitado!",
                data: null
            };
        }

        const newStructure = {
            ...document,
            _id: document._id.toString(),
        }

        return {
            success: true,
            error: null,
            data: {
                document: newStructure,
            },
        };

    } catch (error) {
        console.error('[get-document] Error en el action:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "¡Error desconocido al obtener el documento!",
            data: null
        };
    }
}