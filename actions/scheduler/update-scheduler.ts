"use server"

import { Filter } from "mongodb";

import { getDb } from "@/lib/get-db";

import { UpdateOne } from "@/interfaces/mongo/update-one";

import ScheduledJob from "@/models/schedules/scheduled-job";

export default async function updateScheduler(filter: Filter<ScheduledJob>, update: Partial<ScheduledJob>): Promise<UpdateOne> {

    const db = await getDb();

    const result = await db.scheduledJobs.updateOne(
        filter,
        { $set: update },

    );

    return result;
}

