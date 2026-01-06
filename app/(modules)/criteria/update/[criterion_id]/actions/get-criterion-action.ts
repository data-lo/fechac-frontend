'use server';
import { ObjectId } from "mongodb";

import getCollection from "@/actions/mongo/get-collection";

import { CriterionEntity } from "../../../models/criterion-entity";

export async function getCriterionAction(criterionId: string) {
     const collection = await getCollection<CriterionEntity>("criteria");
    
        const criterion = await collection.findOne({ _id: new ObjectId(criterionId) })
    
        if (!criterion) {
            throw new Error("El criterio solicitado no existe.");
        }
    
        const serializedProject = {
            ...criterion,
            _id: criterion._id.toString(),
        };
    
        return serializedProject;
}
