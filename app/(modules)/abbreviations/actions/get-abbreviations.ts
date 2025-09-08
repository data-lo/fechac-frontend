'use server';

import { getCollection } from "@/actions/authentication-handler-action";
import { ActionResponse } from "@/interfaces/action/action-response";
import { AbbreviationDocument } from "../models/abbreviation-document";

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getAbbreviations(
  page: number = 1,
  limit: number = 10,
  options: Omit<PaginationParams, 'page' | 'limit'> = {}
): Promise<ActionResponse<{
  abbreviations: AbbreviationDocument[];
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

    const collection = await getCollection<AbbreviationDocument>("abbreviations");
    const skip = (page - 1) * limit;

    const { sortBy = 'approval_date', sortOrder = 'desc' } = options;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [criteriaFromDB, total] = await Promise.all([
      collection
        .find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const newStructure = criteriaFromDB.map(criterion => ({
      ...criterion,
      _id: criterion._id.toString()
    }));

    return {
      success: true,
      error: null,
      data: {
        abbreviations: newStructure,
        total,
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

  } catch (error) {
    console.error('Error en action: get-abbrevaition:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al obtener las abreviaciones",
      data: null
    };
  }
}
