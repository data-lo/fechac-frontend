"use client"
// App components
import ActionButton from "@/components/action-button";

// Local hooks
import useDownloadReport from "../../hooks/useDownloadReport";

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