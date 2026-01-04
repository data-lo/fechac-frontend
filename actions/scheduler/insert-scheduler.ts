import type { ObjectId } from "mongodb";

import { getDatabase } from "@/lib/get-database";

import ScheduledJob from "@/models/schedules/scheduled-job";
import { InsertOne } from "@/interfaces/mongo/insert-one";

export async function insertScheduler(
    document: ScheduledJob
): Promise<InsertOne> {

    const db = await getDatabase();

    const result = await db.scheduledJobs.insertOne({
        ...document,
    });

    return result;
}
