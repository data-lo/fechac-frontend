import { MongoClient, Db } from "mongodb";

const uri = process.env.DATABASE_URL!;
if (!uri) throw new Error("DATABASE_URL is not defined");

let cached = (global as any)._mongo || { client: null as MongoClient | null, db: null as Db | null };

export async function getConnection() {
  // Reusar si ya existe
  if (cached.client && cached.db) {
    return cached.db;
  }

  // Crear nueva conexión UNA sola vez
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db();

  cached.client = client;
  cached.db = db;

  (global as any)._mongo = cached;

  return db;
}
