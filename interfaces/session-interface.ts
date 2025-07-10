import { ObjectId } from "mongodb";

export interface AccessRecord {
    _id?: ObjectId;
    code: string;
    sessionState: string;
    createdAt: string | Date;
    isLastAccess: boolean;

}
