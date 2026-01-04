import { Filter, ObjectId } from "mongodb";

import { getDatabase } from "@/lib/get-database";

import ScheduledJob from "@/models/schedules/scheduled-job";
import { UpdateOne } from "@/interfaces/mongo/update-one";

export async function updateScheduler(filter: Filter<ScheduledJob>, update: Partial<ScheduledJob>): Promise<UpdateOne> {

    const db = await getDatabase();

    const result = await db.scheduledJobs.updateOne(
        filter,
        { $set: update },

    );

    return result;
}

