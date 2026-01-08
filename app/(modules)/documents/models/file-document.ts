import File from "./file"; 

import { ObjectId } from "mongodb"; 

export default interface FileDocument extends File {
    _id: string | ObjectId;
}
