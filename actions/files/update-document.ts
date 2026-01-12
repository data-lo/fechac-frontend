'use server';

import { ObjectId } from "mongodb";
import Document from "../../models/files/file";
import getDb from "@/infrastructure/persistence/mongo/get-db";

export async function updateDocument(data: { _id: string; payload: Partial<Document> }) {
    const db = await getDb();

    const result = await db.files.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: data.payload }
    );

    if (result.matchedCount === 0) {
        throw new Error("¡El documento no existe!");
    }

    if (result.modifiedCount === 0) {
        throw new Error("¡No hubo cambios para guardar!");
    }

    return {
        success: true,
        message: "¡El documento se ha modificado con exito!",
    };
}