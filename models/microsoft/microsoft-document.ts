import { ObjectId } from "mongodb";
import { Microsoft } from "./microsoft";

export default interface MicrosoftDocument extends Microsoft{
    _id: ObjectId | string;
}