"use server"

// External dependencies
import { ObjectId } from "mongodb";

// Infrastructure
import getDb from "@/infrastructure/persistence/mongo/get-db";

// Application
import getLatestScheduleExecution from "../scheduler/get-latest-scheduler";
import ProjectReportDTO from "@/domain/projects/dto/project.dto";

export default async function getDocumentsProcessedByScheduleJob(): Promise<ProjectReportDTO[]> {

    const db = await getDb();

    const lastSchedule = await getLatestScheduleExecution();

    if (!lastSchedule) {
        throw new Error('El reporte aún no está listo.')
    }

    const scheduleJobId = new ObjectId(lastSchedule._id)

    const cursor = db.projects.aggregate<ProjectReportDTO>([
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
                            file_name: 1,
                            department: 1,
                            path: 1
                        },
                    },
                ],
                as: "files",
            },
        },
        {
            $project: {
                _id: 0,
                sadap_id: 1,
                files: 1,
            },
        },
    ]);

    const data = await cursor.toArray();

    return data;
}
