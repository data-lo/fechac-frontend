import { getDb } from "@/lib/get-db";

export default async function countScheduledJobs(): Promise<number> {
    const db = await getDb();
    return db.scheduledJobs.countDocuments();
}
