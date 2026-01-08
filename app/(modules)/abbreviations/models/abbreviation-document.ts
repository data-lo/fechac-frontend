import { ObjectId } from "mongodb";
import { Abbreviation } from "./abbreviation";

export default interface AbbreviationDocument extends Abbreviation {
    _id: string | ObjectId;
}