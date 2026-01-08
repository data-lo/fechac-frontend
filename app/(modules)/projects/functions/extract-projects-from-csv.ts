import { parse } from "csv-parse/sync";
import { Project } from "@/models/projects/project";
import { ProjectStatus} from "./get-status-translation";

export async function extractProjectsFromCSV(data: File[]): Promise<Project[]> {
    const newObjects: Project[] = [];

    for (const file of data) {
        const content = await file.text();

        const records = parse<Record<string, string>>(content, {
            columns: true,
            skip_empty_lines: true,
        });

        const newRecord: Project[] = records.map((row) => ({
            sadap_id: row.id?.toUpperCase(),
            project_status: row.Estatus?.toUpperCase(),
            approval_date: row.Aprobado?.toUpperCase(),
            council: row.Consejo?.toUpperCase(),
            municipality: row.Municipio?.toUpperCase(),
            area: row["Área"]?.toUpperCase(),
            category: row.Clase?.toUpperCase(),
            project_type: row.Proy?.toUpperCase(),
            support_area: row["Apoyo en"]?.toUpperCase(),
            applicant_institution: row["Institución solicitante"]?.toUpperCase(),
            authorized_donor: row["Donataria aut."]?.toUpperCase(),
            regulatory_institution: row["Institución normativa"]?.toUpperCase(),
            project_name: row["Nombre del proyecto"]?.toUpperCase(),
            address: row.Domicilio?.toUpperCase(),
            authorized_amount: row["Monto Autorizado"],
            authorized_contract_amount: row["Monto Aut-Conv"],
            percentage: row["%"],
            total_investment: row["Inversión Total"],
            status: ProjectStatus.UNPROCESSED,
        }));

        newObjects.push(...newRecord);
    }

    return newObjects;
}
