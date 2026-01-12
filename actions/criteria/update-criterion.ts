'use server';

import { ObjectId } from "mongodb";
import { UpdateOne } from "@/interfaces/mongo/update-one";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import CriterionDocument from "@/models/criteria/criterion-document";
import hasInvalidCharacter from "../restrictions/has-invalid-characters";

export async function updateCriterion({
    _id,
    payload,
}: {
    _id: string | ObjectId;
    payload: Partial<CriterionDocument>;
}) {
    const db = await getDb();

    if (payload.file_name && await hasInvalidCharacter(payload.file_name)) {
        throw new Error("El nombre del documento contiene uno o más caracteres no permitidos.");
    }

    const result: UpdateOne = await db.criteria.updateOne(
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
