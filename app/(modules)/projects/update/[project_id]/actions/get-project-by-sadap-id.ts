"use server"
import getCollection from "@/lib/connection";

import { ProjectDocument } from "../../../models/project-document";

export default async function getProjectBySadapId(sadap_id: string) {
    const collection = await getCollection<ProjectDocument>("projects");

    const project = await collection.findOne({ sadap_id });

    if (!project) {
        return null;
    }

    return {
        ...project,
        _id: project._id.toString(),
    };
};
