// Domain
import ProjectReportDTO from "@/domain/projects/dto/project.dto";
import ProjectFileCSVRow from "@/domain/reports/dto/project-file-csv-row";

export default async function transformDataToCSV(
    data: ProjectReportDTO[]
): Promise<ProjectFileCSVRow[]> {

    const rows = data.flatMap(project => {

        if (!project.files || project.files.length === 0) {
            return [{
                sadap_id: project.sadap_id,
                project_name: project.project_name,
                area: project.area,
                support_area: project.support_area,
                file_name: '',
                department: '',
                path: '',
            }];
        }

        return project.files.map(file => ({
            sadap_id: project.sadap_id,
            project_name: project.project_name,
            area: project.area,
            support_area: project.support_area,
            file_name: file.file_name,
            department: file.department,
            path: file.path,
        }));
    });

    return rows;
}