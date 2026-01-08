"use server"

import { Db, Collection } from "mongodb";

import type { OptionalId } from "mongodb";

import { getConnection } from "./get-connection";

import FileDocument from "@/app/(modules)/documents/models/file-document";
import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";
import ProjectDocument from "@/models/projects/project-document";
import AbbreviationDocument from "@/app/(modules)/abbreviations/models/abbreviation-document";

export interface ApplicationDatabase {
    files: Collection<OptionalId<FileDocument>>;
    projects: Collection<OptionalId<ProjectDocument>>;
    scheduledJobs: Collection<OptionalId<ScheduledJobDocument>>;
    abbreviations: Collection<OptionalId<AbbreviationDocument>>;
}

let cachedDb: ApplicationDatabase | null = null;

export async function getDb(): Promise<ApplicationDatabase> {
    if (cachedDb) return cachedDb;

    const db: Db = await getConnection();

    cachedDb = {
        files: db.collection<OptionalId<FileDocument>>("Files"),
        projects: db.collection<OptionalId<ProjectDocument>>("Projects"),
        scheduledJobs: db.collection<OptionalId<ScheduledJobDocument>>("ScheduledJobs"),
        abbreviations: db.collection<OptionalId<AbbreviationDocument>>("Abbreviations"),
    };

    return cachedDb;
}
