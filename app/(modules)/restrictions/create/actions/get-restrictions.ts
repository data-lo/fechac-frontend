'use server';

// 1. Acciones / Servicios
import { getCollection } from "@/actions/mongo/get-collection";

// 2. Modelos
import { RestrictionDocument } from "../../models/restriction-document";

export default async function getRestrictions() {
  try {
    const collection = await getCollection<RestrictionDocument>("restrictions");

    const cursor = await collection.find();

    const response = await cursor.toArray();

    cursor.close()

    const formatted: RestrictionDocument[] = response.map((item) => ({
      _id: item._id.toString(),
      character: item.character,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    return formatted
  } catch (error) {
    console.error("Error al Obtener las Restricciones:", error);
    throw error;
  }
}


