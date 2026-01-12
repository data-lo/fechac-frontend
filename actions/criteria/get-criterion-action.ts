'use server';
import { ObjectId } from "mongodb";

import getDb from "@/infrastructure/persistence/mongo/get-db";

import CriterionDocument from "@/models/criteria/criterion-document";

export async function getCriterion(criterionId: string): Promise<CriterionDocument> {

    const db = await getDb();
    
        const criterion = await db.criteria.findOne({ _id: new ObjectId(criterionId) })
    
        if (!criterion) {
            throw new Error("El criterio solicitado no existe.");
        }
    
        const serializedProject = {
            ...criterion,
            _id: criterion._id.toString(),
        };
    
        return serializedProject;
}
