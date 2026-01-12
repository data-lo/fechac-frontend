'use server';

import FileDocument from "@/models/files/file-document";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import ActionResponse from "@/interfaces/action/action-response";


interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export default async function getPendingDocuments(
    page: number = 1,
    limit: number = 10,
    options: Omit<PaginationParams, 'page' | 'limit'> = {}
): Promise<ActionResponse<{
    files: FileDocument[];
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

        const { sortBy = 'sadap_id', sortOrder = 'asc' } = options;

        const sort: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1
        };

        const [filesFromDB, total] = await Promise.all([
            db.files
                .find()
                .collation({ locale: "en", numericOrdering: true })
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .toArray(),
            db.files.countDocuments(),
        ]);

        const totalPages = Math.ceil(total / limit);

        const newStructure = filesFromDB.map((file) => {
            return (
                {
                    ...file,
                    _id: file._id.toString(),
                }
            )
        })


        return {
            success: true,
            error: null,
            data: {
                files: newStructure,
                total,
                currentPage: page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    } catch (error) {
        console.error('[ERROR] en getPendingDocuments:', error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Error desconocido al obtener documentos",
            data: null
        };
    }
}