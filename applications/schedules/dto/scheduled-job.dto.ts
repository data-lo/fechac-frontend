import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";

export type ScheduledJobDto =
    Omit<ScheduledJobDocument, "_id"> & {
        _id: string;
    };
