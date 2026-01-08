"use server"

import { Db, Collection } from "mongodb";

import type { OptionalId } from "mongodb";

import { getConnection } from "./connection";

import ScheduledJobDocument from "@/models/schedules/scheduled-job-document";
import { AbbreviationDocument } from "@/app/(modules)/abbreviations/models/abbreviation-document";
import { ProjectDocument } from "@/app/(modules)/projects/models/project-document";
import { DocumentEntity } from "@/app/(modules)/documents/models/file-document";

export interface ApplicationDatabase {
    scheduledJobs: Collection<OptionalId<ScheduledJobDocument>>;
    abbreviations: Collection<OptionalId<AbbreviationDocument>>;
    projects: Collection<OptionalId<ProjectDocument>>;
    documents:Collection<OptionalId<DocumentEntity>
}

let cachedDb: ApplicationDatabase | null = null;

export async function getDb(): Promise<ApplicationDatabase> {
    if (cachedDb) return cachedDb;

    const db: Db = await getConnection();

    cachedDb = {
        projects: db.collection<OptionalId<ProjectDocument>>("Projects"),
        scheduledJobs: db.collection<OptionalId<ScheduledJobDocument>>("ScheduledJobs"),
        abbreviations: db.collection<OptionalId<AbbreviationDocument>>("Abbreviations"),
        documents: db.collection<OptionalId<DocumentEntity>>("Documents")

    };

    return cachedDb;
}
