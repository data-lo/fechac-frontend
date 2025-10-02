'use server';



import getCollection from "@/actions/mongo/get-collection";
import { extractProjectsFromCSV } from "../functions/extract-projects-from-csv";
import { Project } from "../models/project";
import { revalidatePath } from "next/cache";
import { isClosedProjectLifecycleStatus } from "../functions/normalize-project-lifecycle-status";
import { dedupeBySadapID } from "../functions/dedupe-by-sadap";


export async function synchronizeProjectsAction(values: File[]) {
    try {
        const records = (await extractProjectsFromCSV(values)) as Project[];

        const closedOnly = records.filter(r => isClosedProjectLifecycleStatus(r.project_status));

        const uniqueInBatch = dedupeBySadapID(closedOnly);

        const collection = await getCollection<Project>("projects");

        const incomingIds = uniqueInBatch.map(r => r.sadap_id);

        const existingIds = await collection.distinct("sadap_id", { sadap_id: { $in: incomingIds } });

        const existingSet = new Set(existingIds.map((x: unknown) => String(x).trim()));

        const toInsert = uniqueInBatch.filter(r => !existingSet.has(r.sadap_id));

        let insertedCount = 0;
        let insertedIds: string[] = [];
        let acknowledged = true;

        if (toInsert.length > 0){
            const result = await collection.insertMany(toInsert);
            insertedCount = result.insertedCount;
            insertedIds = Object.values(result.insertedIds).map(id => id.toString());
            acknowledged = result.acknowledged;
        }

        // const data = await collection.insertMany(records);

        revalidatePath("/projects");

        return {
            success: true,
            error: null,
            data: {
                attempted: records.length,
                filteredWrongStatus: records.length - closedOnly.length,
                filteredInBatchDuplicates: closedOnly.length - uniqueInBatch.length,
                filteredExistingDuplicates: uniqueInBatch.length - toInsert.length,
                insertedCount,
                insertedIds,
                acknowledged
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


