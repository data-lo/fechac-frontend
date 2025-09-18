import { ObjectId } from "mongodb"; 
import { File } from "./file"; 

export interface FileDocument extends File {
    _id: string | ObjectId;
}
