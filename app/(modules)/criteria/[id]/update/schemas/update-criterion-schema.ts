import * as z from "zod";
import { BASE_CRITERIA_SCHEMA } from "../../../schemas/base-criteria-form";

const UPDATE_CRITERIA_SCHEMA = BASE_CRITERIA_SCHEMA.extend({
    id: z.string(),
});

export { UPDATE_CRITERIA_SCHEMA };
