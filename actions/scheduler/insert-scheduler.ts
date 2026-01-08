"use server"

import { getDb } from "@/infrastructure/persistence/mongo/get-db";

import { InsertOne } from "@/interfaces/mongo/insert-one";

import ScheduledJob from "@/models/schedules/scheduled-job";

export default async function insertScheduler(
    document: ScheduledJob
): Promise<InsertOne> {

    const db = await getDb();

    const result = await db.scheduledJobs.insertOne({
        ...document,
    });

    return result;
}
