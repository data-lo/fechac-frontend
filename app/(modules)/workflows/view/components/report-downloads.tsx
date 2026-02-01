"use client"

import ActionButton from "@/components/action-button";
import useDownloadReport from "../../hooks/useDownloadReport";
import { downloadCSV } from "@/functions/reports/download-csv";

export default function ReportDownloads() {
    const mutation = useDownloadReport();

    const onClick = () => {
        mutation.mutate();
    }

    return (
        <ActionButton
            className="w-min"
            title="Descargar Reporte"
            iconName="FileCog"
            onClick={onClick}
            isLoading={mutation.isPending}
        />
    )
}