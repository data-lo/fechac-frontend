'use server';

// 1. Acciones / Servicios
import { getCollection } from "@/actions/mongo/get-collection";
import { RestrictionDocument } from "../models/restriction-document";

// 2. Modelos


export default async function getRestrictions() {
  try {
    const collection = await getCollection<RestrictionDocument>("restrictions");

    const cursor = await collection.find();

    const response = await cursor.toArray();

    cursor.close()

    const formatted: RestrictionDocument[] = response.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return formatted
  } catch (error) {
    console.error("Error al Obtener las Restricciones:", error);
    throw error;
  }
}


