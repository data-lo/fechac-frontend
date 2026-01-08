import File from "./file"; 

import { ObjectId } from "mongodb"; 

export interface FileDocument extends File {
    _id: string | ObjectId;
}
