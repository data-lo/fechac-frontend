'use server';



import { getCollection } from "@/actions/moongo/get-collection";
import { getConnection } from "@/lib/mongodb";

import { ObjectId } from "mongodb";

import { revalidatePath } from "next/cache";
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
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    return formatted
  } catch (error) {
    console.error("Error al Obtener las Restricciones:", error);
    throw error;
  }
}


export async function changeStatusRestriction(values: { id: string, isActive: boolean }) {
  try {
    const db = await getConnection();

    const filter = { _id: new ObjectId(values.id) };

    const update = {
      $set: {
        isActive: !values.isActive,
      },
    };

    const response = await db.collection("nomenclature").updateOne(filter, update);

    revalidatePath("/nomenclature");

    return response
  } catch (error) {
    console.error("Error al Actualizar las Restricción:", error);
    throw error;
  }
}
