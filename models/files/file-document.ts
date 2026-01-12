import { ObjectId } from "mongodb"; 

import File from "@/models/files/file"; 

export default interface FileDocument extends File {
    _id: string | ObjectId;
}
