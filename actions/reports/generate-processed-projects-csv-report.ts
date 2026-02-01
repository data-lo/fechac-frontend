"use server";


import convertRowsToCSV from "@/functions/reports/convert-rows-to-csv";
import getDocumentsProcessedByScheduleJob from "./get-documents-processed-by-schedule-job";
import mapProjectsToProjectFileCSVRows from "@/functions/reports/map-projects-to-project-file-csv-rows";

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