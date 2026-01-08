import { ObjectId } from "mongodb";
import { Project } from "./project";

export default interface ProjectDocument extends Project {
    _id: string | ObjectId;
}