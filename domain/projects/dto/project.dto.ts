import FileReportDTO from "@/domain/files/dto/file-report.dto";

export default interface ProjectReportDTO {
    sadap_id: string;
    files: FileReportDTO[]
}