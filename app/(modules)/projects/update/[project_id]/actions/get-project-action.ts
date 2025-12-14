import getCollection from "@/actions/mongo/get-collection";
import { ProjectDocument } from "../../../models/project-document";
import { ObjectId } from "bson";

const getProjectAction = async (project_id: string) => {

    const collection = await getCollection<ProjectDocument>("projects");

    const project = await collection.findOne({ _id: new ObjectId(project_id) })

    if (!project) {
        throw new Error("El proyecto solicitado no existe.");
    }

    const serializedProject = {
        ...project,
        _id: project._id.toString(),
    };

    return serializedProject;
}

export default getProjectAction;