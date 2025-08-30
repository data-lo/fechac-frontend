import { ObjectId } from "mongodb";
import { Criterion } from "./criterion";

export interface CriterionDocument extends Criterion {
    _id: string | ObjectId;
}