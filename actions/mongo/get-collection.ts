// 1. Librerías externas
import { Collection, Db, Document} from "mongodb";

// 2. Librerías internas
import { getConnection } from "@/lib/mongodb";

export default async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
    try {
        if (!name || typeof name !== 'string') {
            throw new Error('El nombre de la colección es requerido y debe ser string');
        }

        const db: Db = await getConnection();

        return db.collection<T>(name);
    } catch (error) {

        console.error(`Error al obtener la colección '${name}':`, error);

        throw error;
    }
}