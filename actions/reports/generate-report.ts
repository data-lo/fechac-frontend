// Modules
import path from "path";
import fs from "fs/promises";


// Application / Use cases
import getDocumentsProcessedByScheduleJob from "./get-documents-processed-by-schedule-job.ts";

// Report utilities
import toCSV from "@/functions/reports/csv-";
import transformDataToCSV from "@/functions/reports/flat-data";

export default async function generateReport() {
    try {
        const data = await getDocumentsProcessedByScheduleJob();

        const rows = await transformDataToCSV(data);

        const csv = toCSV(rows);

        const fileName = `report-${Date.now()}.csv`;
        const filePath = path.join(process.cwd(), "tmp", fileName);

        await fs.writeFile(filePath, csv, "utf-8");

        return {
            success: true,
            downloadUrl: `/api/reports/download/${fileName}`,
        };

    } catch (error) {
        console.error(error);
        throw new Error("No se pudo generar el reporte");
    }
}