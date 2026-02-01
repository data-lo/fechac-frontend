// Domain
import ProjectReportDTO from "@/domain/projects/dto/project.dto";
import ProjectFileCSVRow from "@/domain/reports/dto/project-file-csv-row";

export default function mapProjectsToProjectFileCSVRows(
  data: ProjectReportDTO[]
): ProjectFileCSVRow[] {
  return data.flatMap(project =>
    project.files.map(file => ({
      sadap_id: project.sadap_id,
      file_name: file.file_name,
      department: file.department,
      path: file.path,
    }))
  );
}