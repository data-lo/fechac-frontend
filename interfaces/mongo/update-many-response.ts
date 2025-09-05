import { MongoResponse } from "./mongo-response";

export interface UpdateManyResponse extends MongoResponse {
  modifiedCount: number;
  upsertedId: string | null;
  upsertedCount: number;
  matchedCount: number;
}
