import { FileReportDTO } from "./file-report.dto";

export default interface DocumentsProcessedReportDTO {
    sadapId: string;
    projectName: string;
    projectStatus: string;
    municipality: string;
    area: string;
    files: FileReportDTO[];
}