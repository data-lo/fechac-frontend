import { getDatabase } from "@/lib/get-database";

export default async function countScheduledJobs(): Promise<number> {
    const db = await getDatabase();
    return db.scheduledJobs.countDocuments();
}
