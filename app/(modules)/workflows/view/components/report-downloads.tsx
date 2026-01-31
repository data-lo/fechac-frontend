"use client"

import ActionButton from "@/components/action-button";
import useDownloadReport from "../../hooks/useDownloadReport";

export default function ReportDownloads() {
    const hook = useDownloadReport();

    const onClick = () => {
        hook.mutate()
    }

    return (
        <ActionButton
            className="w-min"
            title="Descargar Reporte"
            iconName="FileCog"
            onClick={onClick}
            isLoading={hook.isPending}
        />
    )
}