"use server"

import getDb from "@/infrastructure/persistence/mongo/get-db";

export default async function hasInvalidCharacter(documentName: string): Promise<Boolean> {

    const db = await getDb();

    const cursor = await db.restrictions.find({ isActive: true });

    const arrayCharacters = await cursor.toArray()

    return !arrayCharacters.some((item) => documentName.includes(item.character))
}