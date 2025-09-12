'use server';



import getCollection from "@/actions/mongo/get-collection";
import { extractProjectsFromCSV } from "../functions/extract-projects-from-csv";
import { Project } from "../models/project";
import { revalidatePath } from "next/cache";


export async function synchronizeProjectsAction(values: File[]) {
    try {
        const records = await extractProjectsFromCSV(values);

        const collection = await getCollection<Project>("projects");

        const data = await collection.insertMany(records);

        revalidatePath("/projects");

        return {
            success: true,
            error: null,
            data: {
                insertedCount: data.insertedCount,
                insertedIds: Object.values(data.insertedIds).map(id => id.toString()),
                acknowledged: data.acknowledged
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido",
            data: null
        };
    }
}


