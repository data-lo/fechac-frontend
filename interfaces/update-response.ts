import { ObjectId } from "mongodb";

export interface UpdateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string | null;
  upsertedCount: number;
  matchedCount: number;
}
