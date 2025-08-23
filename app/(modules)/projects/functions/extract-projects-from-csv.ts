import { Project } from "@/app/(modules)/projects/models/project";
import { parse } from "csv-parse/sync";

export async function extractProjectsFromCSV(data: File[]): Promise<Project[]> {
    const newObjects: Project[] = [];

    for (const file of data) {
        const content = await file.text();

        const records = parse<Record<string, string>>(content, {
            columns: true,
            skip_empty_lines: true,
        });

        const newRecord: Project[] = records.map((row) => ({
            sadap_id: row.id,
            project_status: row.Estatus,
            approval_date: row.Aprobado,
            council: row.Consejo,
            municipality: row.Municipio,
            area: row["Área"],
            category: row.Clase,
            project_type: row.Proy,
            support_area: row["Apoyo en"],
            applicant_institution: row["Institución solicitante"],
            authorized_donor: row["Donataria aut."],
            regulatory_institution: row["Institución normativa"],
            project_name: row["Nombre del proyecto"].toUpperCase(),
            address: row.Domicilio,
            authorized_amount: row["Monto Autorizado"],
            authorized_contract_amount: row["Monto Aut-Conv"],
            percentage: row["%"],
            total_investment: row["Inversión Total"],
            transfer_status: "NOT_TRANSFERRED",
        }));

        newObjects.push(...newRecord);
    }

    return newObjects;
}
