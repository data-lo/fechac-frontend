import { ObjectId } from "mongodb";
import { MongoResponse } from "./mongo-response";

export interface InsertManyResponse extends MongoResponse {
    insertedCount: number;
    insertedIds: { [key: number]: ObjectId }
}