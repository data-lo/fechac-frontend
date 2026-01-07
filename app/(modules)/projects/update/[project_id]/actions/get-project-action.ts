import { ObjectId } from "bson";
import { getDb } from "@/lib/get-db";
import { ProjectDocument } from "../../../models/project-document";

const getProjectAction = async (project_id: string): Promise<ProjectDocument> => {

    const db = await getDb();

    const project = await db.projects.findOne({ _id: new ObjectId(project_id) })

    if (!project) {
        throw new Error("El proyecto solicitado no existe.");
    }

    const serializedProject: ProjectDocument = {
        ...project,
        _id: project._id.toString(),
    };

    return serializedProject;
}

export default getProjectAction;