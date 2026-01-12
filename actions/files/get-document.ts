'use server';
import { ObjectId } from "mongodb";
import FileDocument from "../../models/files/file-document";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import ActionResponse from "@/interfaces/action/action-response";

export default async function getDocument(_id: string): Promise<ActionResponse<{ document: FileDocument; }>> {
    try {
        const db = await getDb();

        if (!ObjectId.isValid(_id)) {
            return {
                success: false,
                error: "¡ID inválido!",
                data: null
            }
        }

        const document = await db.files.findOne({ _id: new ObjectId(_id) });

        if (!document) {
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