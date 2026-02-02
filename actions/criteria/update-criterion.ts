'use server';

// 1. Librerías externas
import { ObjectId } from "mongodb";

// 2. Infraestructura / Base de datos
import getDb from "@/infrastructure/persistence/mongo/get-db";

// 3. Interfaces
import { UpdateOne } from "@/interfaces/mongo/update-one";

// 4. Modelos
import CriterionDocument from "@/models/criteria/criterion-document";

// 5. Helpers / utilidades locales
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
        return {
            success: false, 
            message: "¡El nombre del documento contiene caracteres no permitidos!",
        };
    }

    const result: UpdateOne = await db.criteria.updateOne(
        { _id: new ObjectId(_id) },
        { $set: payload },
        { upsert: false }
    );

    if (result.matchedCount === 0) {
        return {
            success: false,
            message: "¡El documento no existe!",
        };
    }

    if (result.modifiedCount === 0) {
        return {
            success: false,
            message: "¡No hubo cambios para guardar!",
        };
    }

    return {
        success: true,
        message: "¡El documento se ha modificado con éxito!",
    };
}
