import { ObjectId } from "mongodb";
import { MongoResponse } from "./mongo-response";

export interface InsertOneResponse extends MongoResponse {
    insertedId: string | ObjectId;
}