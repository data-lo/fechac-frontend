"use server";

// App utilities / Reports
import convertRowsToCSV from "@/functions/reports/convert-rows-to-csv";
import mapProjectsToProjectFileCSVRows from "@/functions/reports/map-projects-to-project-file-csv-rows";

// Local actions
import getDocumentsProcessedByScheduleJob from "./get-documents-processed-by-schedule-job";

export default async function generateProcessedProjectsCSVReport(): Promise<string> {
  try {
    const data = await getDocumentsProcessedByScheduleJob();

    const rows = mapProjectsToProjectFileCSVRows(data);

    const csv = convertRowsToCSV(rows);

    return csv;
  } catch (error) {
    console.error(error);
    throw new Error("¡No se pudo generar el reporte!");
  }
}