import { ObjectId } from "mongodb"; 
import Document from "./document"; 

export interface DocumentEntity extends Document {
    _id: string | ObjectId;
}
