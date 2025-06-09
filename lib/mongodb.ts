import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const client = new MongoClient(uri);

let dbInstance: ReturnType<typeof client.db> | null = null;

export async function getConnection() {
  if (!dbInstance) {
    await client.connect();
    
    dbInstance = client.db();
  }
  return dbInstance;
}
