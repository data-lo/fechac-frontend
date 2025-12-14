'use server';

// 1. Acciones internas / helpers
import getCollection from "@/actions/mongo/get-collection";

// 2. Interfaces
import { Criterion } from "../models/criterion";
import { InsertOneResponse } from "@/interfaces/mongo/insert-one-response";

export default async function createCriterionAction(criterion: Criterion) {

    const collection = await getCollection<Criterion>("criteria");

    const result: InsertOneResponse = await collection.insertOne(criterion);

    if (!result.acknowledged) {
        throw new Error("La operación de inserción no fue confirmada por la base de datos.");
    }

    if (!result.insertedId) {
        throw new Error("No se pudo insertar el documento.");
    }

    return {
        success: true,
        message: "¡El criterio se ha creado con éxito!",
    };

}
