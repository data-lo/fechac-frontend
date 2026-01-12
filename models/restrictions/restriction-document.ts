import { ObjectId } from "mongodb";
import { Restriction } from "./restriction";

export default interface RestrictionDocument extends Restriction {
    _id: string | ObjectId
}