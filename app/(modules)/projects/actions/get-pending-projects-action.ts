'use server';

import { getCollection } from "@/actions/authentication-handler-action";
import { ProjectDocument } from "../models/project-document";
import { ActionResponse } from "@/interfaces/action-response";
import { revalidatePath } from "next/cache";

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getPendingProjects(
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

    const collection = await getCollection<ProjectDocument>("projects");
    const skip = (page - 1) * limit;

    const { sortBy = 'createdAt', sortOrder = 'desc' } = options;

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 as const : -1 as const };

    const [projects, total] = await Promise.all([
      collection
        .find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      error: null,
      data: {
        projects,
        total,
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener proyectos",
      data: null
    };
  }
}