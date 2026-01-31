"use server"

// External dependencies
import { ObjectId } from "mongodb";

// Infrastructure / Persistence
import getDb from "@/infrastructure/persistence/mongo/get-db";

// Application / Scheduler
import getLatestScheduleExecution from "../scheduler/get-latest-scheduler";
export default async function getDocumentsProcessedByScheduleJob() {

    const db = await getDb();

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        throw new Error('El reporte aún no está listo.')
    }

    const scheduleJobId = new ObjectId(lastSchedule._id)

    const cursor = db.projects.aggregate([
        {
            $match: {
                scheduled_job_id: scheduleJobId,
            },
        },
        {
            $lookup: {
                from: "Files",
                let: { sadap_id: "$sadap_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$sadap_id", "$$sadap_id"],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                        },
                    },
                ],
                as: "files",
            },
        },
        {
            $project: {
                _id: 0,
                scheduled_job_id: 0
            },
        },
    ]);

    const data = await cursor.toArray();

    console.log(data);

    return data

}
