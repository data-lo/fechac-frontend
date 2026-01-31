// Actions
import getDocumentsProcessedByScheduleJob from "@/actions/reports/get-documents-processed-by-schedule-job.ts";

// External libraries
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const useDownloadReport = () => {
    return useMutation({
        mutationFn: async () => {
            return await getDocumentsProcessedByScheduleJob()
        },
        onSuccess: () => {
            toast.success("¡El reporte se descargó con éxito!");
        },
        onError(error) {
            toast.error(error.message);
        },
    });
}

export default useDownloadReport;