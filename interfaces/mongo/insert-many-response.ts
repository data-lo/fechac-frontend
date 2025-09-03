import { ObjectId } from "mongodb";
import { InsertResponse } from "./insert-response";

export interface InsertManyResponse extends InsertResponse {
    insertedCount: number;
    insertedIds: { [key: number]: ObjectId }
}