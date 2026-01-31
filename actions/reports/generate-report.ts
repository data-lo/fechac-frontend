import getDocumentsProcessedByScheduleJob from "./get-documents-processed-by-schedule-job.ts";

export default async function generateReport() {
    
    const data = await getDocumentsProcessedByScheduleJob();

    
}