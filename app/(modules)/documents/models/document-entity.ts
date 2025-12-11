import { ObjectId } from "mongodb"; 
import { File } from "./document"; 

export interface DocumentEntity extends File {
    _id: string | ObjectId;
}
