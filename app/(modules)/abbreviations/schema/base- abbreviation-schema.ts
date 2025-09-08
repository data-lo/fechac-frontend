import { REQUIRED_FIELD } from "@/messages/form-messages";
import * as z from "zod";

const BASE_ABBREVIATION_SCHEMA = z.object({
    abbreviation: z.string()
        .min(1, { message: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    type: z
        .string({ required_error: REQUIRED_FIELD })
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    name: z.string()
        .min(1, { message: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
});

export { BASE_ABBREVIATION_SCHEMA };
