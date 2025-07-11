import { ObjectId } from "mongodb";
import { MicrosoftTokenResponse } from "./microsoft-token-response";

export interface MicrosoftTokenObject extends MicrosoftTokenResponse {
    _id?: ObjectId
    accessId: ObjectId
}