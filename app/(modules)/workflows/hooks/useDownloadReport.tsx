// External libraries
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// App actions
import generateReport from "@/actions/reports/generate-processed-projects-csv-report";

// App utilities / Reports
import { downloadCSV } from "@/functions/reports/download-csv";

const useDownloadReport = () => {
    return useMutation({
        mutationFn: async () => {
            return await generateReport();
        },
        onSuccess: (csv: string) => {
            downloadCSV(csv);
            toast.success("¡El reporte se descargó con éxito!");
        },
        onError(error) {
            toast.error(error.message);
        },
    });
}

export default useDownloadReport;