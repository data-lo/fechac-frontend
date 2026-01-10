'use server';

import getDb from "@/infrastructure/persistence/mongo/get-db";

import ActionResponse from "@/interfaces/action/action-response";

import ProjectDocument from "@/models/projects/project-document";

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default async function getPendingProjects(
  page: number = 1,
  limit: number = 10,
  options: Omit<PaginationParams, 'page' | 'limit'> = {}
): Promise<ActionResponse<{
  projects: ProjectDocument[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}>> {
  try {
    if (page < 1) {
      return {
        success: false,
        error: "El número de página debe ser mayor a 0",
        data: null
      };
    }

    if (limit < 1 || limit > 100) {
      return {
        success: false,
        error: "El límite debe estar entre 1 y 100",
        data: null
      };
    }

    const db = await getDb();
    const skip = (page - 1) * limit;

    const { sortBy = 'sadap_id', sortOrder = 'desc' } = options;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [projectsFromDB, total] = await Promise.all([
      db.projects
        .find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.projects.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const serializedProjects = projectsFromDB.map(project => ({
      ...project,
      _id: project._id.toString(),
    }));

    return {
      success: true,
      error: null,
      data: {
        projects: serializedProjects,
        total,
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

  } catch (error) {
    console.error('Error en getPendingProjects:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener proyectos",
      data: null
    };
  }
}
