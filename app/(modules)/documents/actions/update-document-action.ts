'use server';

import { ObjectId } from "mongodb";

import getCollection from "@/actions/mongo/get-collection";

import Document from "../models/document";

export async function updateDocumentAction(data: { _id: string; payload: Partial<Document> }) {
    const collection = await getCollection<Document>("documents");

    const result = await collection.updateOne(
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