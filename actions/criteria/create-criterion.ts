'use server';

// 1. Acciones internas / helpers
import getDb from "@/infrastructure/persistence/mongo/get-db";

// 2. Interfaces
import { Criterion } from "@/models/criteria/criterion";
import { InsertOne } from "@/interfaces/mongo/insert-one";
import hasInvalidCharacter from "../restrictions/has-invalid-characters";

export default async function createCriterion(criterion: Criterion) {

    const db = await getDb();

    if (await hasInvalidCharacter(criterion.file_name)) {
        throw new Error("El nombre del documento contiene uno o más caracteres no permitidos.");
    }

    const result: InsertOne = await db.criteria.insertOne(criterion);

    if (!result.acknowledged) {
        throw new Error("La operación de inserción no fue confirmada por la base de datos.");
    }

    if (!result.insertedId) {
        throw new Error("No se pudo insertar el documento.");
    }

    return {
        success: true,
        message: "¡El criterio se ha creado con éxito!",
        _id: result.insertedId.toString(),
    };

}
