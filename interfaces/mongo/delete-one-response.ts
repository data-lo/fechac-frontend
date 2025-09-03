import { MongoResponse } from "./mongo-response";

export interface DeleteOneResponse extends MongoResponse {
  acknowledged: boolean;
  deletedCount: number;
}
