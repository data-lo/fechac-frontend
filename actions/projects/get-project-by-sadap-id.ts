"use server"

import getDb from "@/infrastructure/persistence/mongo/get-db";

import ProjectDocument from "@/models/projects/project-document";

export default async function getProjectBySadapId(sadap_id: string): Promise<ProjectDocument | null> {
    const db = await getDb();

    const project = await db.projects.findOne({ sadap_id });

    if (!project) {
        return null;
    }

    return {
        ...project,
        _id: project._id.toString(),
    };
};
