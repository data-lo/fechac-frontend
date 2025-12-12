import { ObjectId } from "mongodb";
import { Criterion } from "./criterion";

export interface CriterionEntity extends Criterion {
    _id: string | ObjectId;
}