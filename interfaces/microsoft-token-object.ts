import { ObjectId } from "mongodb";
import { MicrosoftTokenResponse } from "./microsoft-token-response";

export interface MicrosoftSessionObject extends MicrosoftTokenResponse {
    _id?: ObjectId
    is_last_token_obtained?: boolean
    renewed_token_expiration_date?: Date
    created_at?: Date
    code: string
}