'use server';

import { ObjectId } from "mongodb";

import getCollection from "@/actions/mongo/get-collection";

import { CriterionEntity } from "../models/criterion-entity";

import { UpdateOneResponse } from "@/interfaces/mongo/update-one";

export async function updateCriterion({
    _id,
    payload,
}: {
    _id: string | ObjectId;
    payload: Partial<CriterionEntity>;
}) {
    const collection = await getCollection<CriterionEntity>("criteria");

    const result: UpdateOneResponse = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: payload },
        { upsert: false }
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
