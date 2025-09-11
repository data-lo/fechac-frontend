import { ObjectId } from "mongodb";
import { MongoResponse } from "./mongo-response";

export interface UpdateOneResponse extends MongoResponse {
  matchedCount: number;
  modifiedCount: number;
  upsertedCount?: number;
  upsertedId: ObjectId | string | null;
}