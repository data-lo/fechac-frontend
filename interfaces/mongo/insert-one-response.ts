import { ObjectId } from "mongodb";
import { InsertResponse } from "./insert-response";

export interface InsertOneResponse extends InsertResponse {
    insertedId: string | ObjectId;
}