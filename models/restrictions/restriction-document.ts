import { ObjectId } from "mongodb";
import { Restriction } from "./restriction";

export interface RestrictionDocument extends Restriction {
    _id: string | ObjectId
}