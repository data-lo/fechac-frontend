'use server';

import { Restriction } from "@/app/(modules)/nomenclature/interfaces/restriction";

import { getConnection } from "@/lib/mongodb";

import { ObjectId } from "mongodb";

import { revalidatePath } from "next/cache";

export async function createRestriction(data: { character: string }) {
  try {
    const db = await getConnection();

    const isExist = await existRestriction(data.character);

    if (isExist) {
      throw new Error(`El carácter "${data.character}" ya existe en la nomenclatura.`);
    }

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

export async function existRestriction(character: string) {
  try {
    const db = await getConnection();

    const response = await db.collection("nomenclature").findOne({
      character: character
    });

    revalidatePath("/nomenclature");

    return response
  } catch (error) {
    console.error("Error al Actualizar las Restricción:", error);
    throw error;
  }
}