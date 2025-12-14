import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const CRITERIA_SCHEMA = z.object({
    file_name: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    quality_system_code: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    primary_keywords: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    secundary_keywords: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    name_variants: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    department: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    target_drives: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    target_path: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    domain_tags: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    project_focus: z
        .string()
        .transform((val) => val.toUpperCase()),

    project_area: z
        .string()
        .transform((val) => val.toUpperCase()),

    project_type: z
        .string()
        .transform((val) => val.toUpperCase()),

    version: z
        .string()
        .transform((val) => val.toUpperCase()),
});

export { CRITERIA_SCHEMA };
