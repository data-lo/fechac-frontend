'use server';

import { Restriction } from "@/app/(modules)/nomenclature/interfaces/restriction";
import { getConnection } from "@/lib/mongodb";

import { revalidatePath } from "next/cache";

export async function createRestriction(data: { character: string }) {
  try {
    const db = await getConnection();

    const result = await db.collection("nomenclature").insertOne({
      character: data.character,
      isActive: true,
    });

    revalidatePath("/nomenclature");

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("Error al Crear la Nomenclatura:", error);
    throw error;
  }
}


export async function getRestrictions() {
  try {
    const db = await getConnection();

    const cursor = await db.collection("nomenclature").find();

    const response = await cursor.toArray();

    cursor.close()

    const formatted: Restriction[] = response.map((item) => ({
      _id: item._id.toString(),
      character: item.character,
      isActive: item.isActive,
    }));

    return formatted
  } catch (error) {
    console.error("Error al Obtener las Restricciones:", error);
    throw error;
  }
}
