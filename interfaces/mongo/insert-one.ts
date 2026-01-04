import { ObjectId } from "mongodb";
import { MongoResponse } from "./mongo-response";

export interface InsertOne extends MongoResponse {
    insertedId: string | ObjectId;
}