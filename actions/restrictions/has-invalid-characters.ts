"use server";

// Infrastructure
import getDb from "@/infrastructure/persistence/mongo/get-db";

export default async function hasInvalidCharacter(
    fileName: string
): Promise<boolean> {
    const db = await getDb();

    const cursor = db.restrictions.find({ status: true });

    const characters = await cursor.toArray();

    if (characters.length === 0) {
        return false;
    }

    return characters.some(({ character }) =>
        fileName.includes(character)
    );
}