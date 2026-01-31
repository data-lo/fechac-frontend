import FileReportDTO from "@/domain/files/dto/file-report.dto";

export default interface ProjectReportDTO {
    sadap_id: string;
    project_name: string,
    area: string,
    support_area: string,
    files: FileReportDTO[]
}