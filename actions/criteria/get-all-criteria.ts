'use server';

import { cache } from "react";
import getDb from "@/infrastructure/persistence/mongo/get-db";
import ActionResponse from "@/interfaces/action/action-response";
import CriterionDocument from "@/models/criteria/criterion-document";

const getAllCriteria = cache(async (): Promise<ActionResponse<{ criteria: CriterionDocument[] }>> => {
  try {
    const db = await getDb();

    const criteriaFromDB = await db.criteria.find({ is_active: true }).toArray();

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

export default getAllCriteria;