"use server"

import { Db, Collection } from "mongodb";

import type { OptionalId } from "mongodb";

import { getConnection } from "./get-connection";

import FileDocument from "@/models/files/file-document";
import ProjectDocument from "@/models/projects/project-document";
import CriterionDocument from "@/models/criteria/criterion-document";
import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";
import AbbreviationDocument from "@/app/(modules)/abbreviations/models/abbreviation-document";

export interface ApplicationDatabase {
    files: Collection<OptionalId<FileDocument>>;
    projects: Collection<OptionalId<ProjectDocument>>;
    criteria: Collection<OptionalId<CriterionDocument>>;
    scheduledJobs: Collection<OptionalId<ScheduledJobDocument>>;
    abbreviations: Collection<OptionalId<AbbreviationDocument>>;
}

let cachedDb: ApplicationDatabase | null = null;

export default async function getDb(): Promise<ApplicationDatabase> {
    if (cachedDb) return cachedDb;

    const db: Db = await getConnection();

    cachedDb = {
        files: db.collection<OptionalId<FileDocument>>("Files"),
        projects: db.collection<OptionalId<ProjectDocument>>("Projects"),
        scheduledJobs: db.collection<OptionalId<ScheduledJobDocument>>("ScheduledJobs"),
        abbreviations: db.collection<OptionalId<AbbreviationDocument>>("Abbreviations"),
        criteria: db.collection<OptionalId<CriterionDocument>>("Criteria"),
    };

    return cachedDb;
}
