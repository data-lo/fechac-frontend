'use server';

// 1. Acciones internas / helpers
import getDb from "@/infrastructure/persistence/mongo/get-db";

// 2. Interfaces
import { Criterion } from "@/models/criteria/criterion";
import { InsertOne } from "@/interfaces/mongo/insert-one";

export default async function createCriterionAction(criterion: Criterion) {

    const db = await getDb();

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
