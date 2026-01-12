'use server';

import getDb from "@/infrastructure/persistence/mongo/get-db";
import ActionResponse from "@/interfaces/action/action-response";
import CriterionDocument from "@/models/criteria/criterion-document";

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getCriteria(
  page: number = 1,
  limit: number = 10,
  options: Omit<PaginationParams, 'page' | 'limit'> = {}
): Promise<ActionResponse<{
  criteria: CriterionDocument[];
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

    const [criteriaFromDB, total] = await Promise.all([
      db.criteria
        .find()
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.criteria.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const serialized = criteriaFromDB.map(criterion => ({
      ...criterion,
      _id: criterion._id.toString()
    }));

    return {
      success: true,
      error: null,
      data: {
        criteria: serialized,
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
