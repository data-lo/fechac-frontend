import { Db, Collection } from "mongodb";

import type { OptionalId } from "mongodb";

import { getConnection } from "./connection";

import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";

export interface ApplicationDatabase {
    scheduledJobs: Collection<OptionalId<ScheduledJobDocument>>;
}

let cachedDb: ApplicationDatabase | null = null;

export async function getDatabase(): Promise<ApplicationDatabase> {
    if (cachedDb) return cachedDb;

    const db: Db = await getConnection();

    cachedDb = {
        scheduledJobs: db.collection<OptionalId<ScheduledJobDocument>>("ScheduledJobs"),

    };

    return cachedDb;
}
