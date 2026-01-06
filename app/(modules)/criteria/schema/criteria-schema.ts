import * as z from "zod";

import { REQUIRED_FIELD, REQUIRED_SELECTION_MESSAGE } from "@/messages/form-messages";

const CRITERIA_SCHEMA = z.object({
    file_name: z.string().min(1, REQUIRED_FIELD).transform(value => value.toUpperCase()),

    quality_system_code: z.string().min(1, REQUIRED_FIELD).transform(value => value.toUpperCase()).nullable(),

    file_types: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),

    primary_keywords: z
        .array(z.string().transform(value => value.toUpperCase()))
        .transform(arr => arr.filter(value => value.trim() !== ""))
        .nullable(),

    secondary_keywords: z
        .array(z.string().transform(value => value.toUpperCase()))
        .transform(arr => arr.filter(value => value.trim() !== ""))
        .nullable(),

    name_variants: z
        .array(z.string().transform(value => value.toUpperCase()))
        .transform(arr => arr.filter(value => value.trim() !== ""))
        .nullable(),

    department: z.string().min(1, REQUIRED_FIELD).transform(value => value.toUpperCase()),

    target_drives: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),

    target_path: z.string().transform(value => value.toUpperCase()).nullable(),

    project_focus: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
    project_area: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
    project_type: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
});


export default CRITERIA_SCHEMA