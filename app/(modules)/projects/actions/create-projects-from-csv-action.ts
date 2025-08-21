'use server';

import { extractProjectsFromCSV } from "@/app/(modules)/projects/functions/extract-projects-from-csv";
import { getCollection } from "../../../../actions/authentication-handler-action";
import { Project } from "../models/project";
import { revalidatePath } from "next/cache";


export async function createProjectsFromCSVAction(values: File[]) {
    try {
        const records = await extractProjectsFromCSV(values);

        const collection = await getCollection<Project>("projects");

        const data = await collection.insertMany(records);

        revalidatePath("/projects");

        return {
            success: true,
            error: null,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido",
            data: null
        };
    }
}


