'use server';

import { cache } from "react";

import getCollection from "@/actions/mongo/get-collection";

import { CriterionEntity } from "../models/criterion-entity";

import { ActionResponse } from "@/interfaces/action/action-response";

export const getAllCriteriaAction = cache(async (): Promise<ActionResponse<{ criteria: CriterionEntity[] }>> => {
  try {
    const collection = await getCollection<CriterionEntity>("criteria");

    const criteriaFromDB = await collection.find({ is_active: true }).toArray();

    const serialized = criteriaFromDB.map(item => ({
      ...item,
      _id: item._id.toString()
    }));

    return {
      success: true,
      error: null,
      data: { criteria: serialized }
    };

  } catch (error) {
    console.error("Error en getAllCriteriaAction:", error);

    return {
      success: false,
      error: "Ocurrió un error al obtener los criterios.",
      data: null
    };
  }
});
