'use server';

import prisma from '@/lib/prisma';

export async function createNomenclatureAction(data: { character: string }) {
    console.log(data)
    try {
        const result = await prisma.restriction.create({
            data: {
                character: data.character,
                isActive: true,
            },
        });

        return {
            status: 200,
            success: true,
            data: result,
        };
    } catch (error) {
        console.error('Error en createNomenclatureAction:', error);
        return {
            status: 500,
            success: false,
            error: 'Error al crear la nomenclatura',
        };
    }
}
