'use server';

import { extractProjectsFromCSV } from "@/functions/extract-projects-from-csv";
import { Collection, ObjectId, Db, Document } from "mongodb";
import { getCollection } from "../../../../actions/authentication-handler-action";
import { ProjectRecord } from "@/interfaces/project";


export async function uploadProjectAction(data: File[]) {
    try {
        const records = await extractProjectsFromCSV(data);

        const collection = await getCollection<ProjectRecord>("projects");

        await collection.insertMany(records);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido",
        };
    }
}