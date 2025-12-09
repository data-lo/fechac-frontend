'use server';

import getCollection from "@/actions/mongo/get-collection";
import { extractProjectsFromCSV } from "../../functions/extract-projects-from-csv";
import { Project } from "../../models/project";
import { revalidatePath } from "next/cache";

import { uniqueProjectsBySadapId } from "../../functions/unique-projects-by-sadap-id";
import { isClosedProject } from "../../functions/is-closed-project";


export async function synchronizeProjectsAction(values: File[]) {
    try {
        // 1. Extraer proyectos desde CSV
        const projects = await extractProjectsFromCSV(values) as Project[];

        // 2. Filtrar proyectos cerrados y quitar duplicados
        const closedProjects = projects.filter(p =>
            isClosedProject(p.project_status)
        );

        const uniqueProjects = uniqueProjectsBySadapId(closedProjects);

        // 3. Normalizar sadap_id (para evitar problemas con espacios o nulls)
        const incomingSadapIds = uniqueProjects
            .map(p => String(p.sadap_id ?? "").trim())
            .filter(Boolean);

        // 4. Obtener IDs existentes desde la BD
        const collection = await getCollection<Project>("projects");

        const existingSadapIds = await collection.distinct("sadap_id", {
            sadap_id: { $in: incomingSadapIds }
        });
        const existingSadapIdSet = new Set(existingSadapIds.map(id => String(id).trim()));

        // 5. Filtrar proyectos que no están en la BD
        const newProjects = uniqueProjects.filter(
            p => !existingSadapIdSet.has(String(p.sadap_id ?? "").trim())
        );

        // 6. Insertar proyectos nuevos
        let insertedCount = 0;
        let insertedIds: string[] = [];
        let acknowledged = true;

        if (newProjects.length > 0) {
            const result = await collection.insertMany(newProjects);
            insertedCount = result.insertedCount;
            insertedIds = Object.values(result.insertedIds).map(id => id.toString());
            acknowledged = result.acknowledged;
        }
        revalidatePath("/projects");

        return {
            success: true,
            error: null,
            data: {
                attempted: projects.length,
                filteredWrongStatus: projects.length - closedProjects.length,
                filteredInBatchDuplicates: closedProjects.length - uniqueProjects.length,
                filteredExistingDuplicates: uniqueProjects.length - newProjects.length,
                insertedCount,
                insertedIds,
                acknowledged
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido",
            data: null
        };
    }
}


