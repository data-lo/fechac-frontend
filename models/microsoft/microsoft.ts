import { ObjectId } from "mongodb";
import { MicrosoftToken } from "../../interfaces/microsoft/microsoft-token";

export interface Microsoft extends MicrosoftToken {
    is_last_token_obtained?: boolean
    renewed_token_expiration_date?: Date
    created_at?: Date
    code: string
}