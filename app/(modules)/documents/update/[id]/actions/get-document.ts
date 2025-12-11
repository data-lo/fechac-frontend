'use server';


import { ActionResponse } from "@/interfaces/action/action-response";
import { FileDocument } from "../../../models/file-document";
import { ObjectId } from "mongodb";
import getCollection from "@/actions/mongo/get-collection";

export async function getDocument(_id: string): Promise<ActionResponse<{ document: FileDocument; }>> {
    try {
        const collection = await getCollection<FileDocument>("documents");
        
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