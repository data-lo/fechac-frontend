import * as z from "zod";
import { BASE_CRITERIA_SCHEMA } from "../../../schema/criteria-schema";

const UPDATE_CRITERIA_SCHEMA = BASE_CRITERIA_SCHEMA.extend({
    _id: z.string(),
});

export { UPDATE_CRITERIA_SCHEMA };
