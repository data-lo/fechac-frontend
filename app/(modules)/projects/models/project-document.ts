import { ObjectId } from "mongodb";
import { Project } from "./project";

export interface ProjectDocument extends Project {
    _id: ObjectId;
}