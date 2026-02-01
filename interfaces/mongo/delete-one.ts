import { MongoResponse } from "./mongo-response";

export interface DeleteOne extends MongoResponse {
  acknowledged: boolean;
  deletedCount: number;
}
