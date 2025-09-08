import { ObjectId } from "mongodb";
import { Abbreviation } from "./abbreviation";

export interface AbbreviationDocument extends Abbreviation {
    _id: string | ObjectId;
}