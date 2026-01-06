"use server"

import { getDatabase } from "@/lib/get-database";

import { InsertOne } from "@/interfaces/mongo/insert-one";

import ScheduledJob from "@/models/schedules/scheduled-job";

export default async function insertScheduler(
    document: ScheduledJob
): Promise<InsertOne> {

    const db = await getDatabase();

    const result = await db.scheduledJobs.insertOne({
        ...document,
    });

    return result;
}
