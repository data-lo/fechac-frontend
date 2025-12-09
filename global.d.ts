import { MongoClient } from "mongodb";

declare global {
  // Permite agregar propiedades al objeto global
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
