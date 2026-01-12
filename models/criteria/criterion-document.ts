import { ObjectId } from "mongodb";
import { Criterion } from "./criterion";

export default interface CriterionDocument extends Criterion {
    _id: string | ObjectId;
}