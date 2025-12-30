import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.DATABASE_URL!;
if (!uri) throw new Error("DATABASE_URL is not defined");

let cached = (global as any)._mongo || { client: null as MongoClient | null, db: null as Db | null };

export async function getConnection() {
  if (cached.client && cached.db) {
    return cached.db;
  }

  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db();

  cached.client = client;

  cached.db = db;

  (global as any)._mongo = cached;

  return db;
}

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
