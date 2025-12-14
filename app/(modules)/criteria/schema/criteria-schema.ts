import * as z from "zod";

import { REQUIRED_FIELD, REQUIRED_SELECTION_MESSAGE } from "@/messages/form-messages";

const CRITERIA_SCHEMA = z.object({
    file_name: z.string().min(1, REQUIRED_FIELD).transform(v => v.toUpperCase()),

    quality_system_code: z.string().min(1, REQUIRED_FIELD).transform(v => v.toUpperCase()),

    file_types: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),

    primary_keywords: z
        .array(z.string().transform(v => v.toUpperCase()))
        .transform(arr => arr.filter(v => v.trim() !== ""))
        .nullable(),

    secondary_keywords: z
        .array(z.string().transform(v => v.toUpperCase()))
        .transform(arr => arr.filter(v => v.trim() !== ""))
        .nullable(),

    name_variants: z
        .array(z.string().transform(v => v.toUpperCase()))
        .transform(arr => arr.filter(v => v.trim() !== ""))
        .nullable(),

    department: z.string().min(1, REQUIRED_FIELD).transform(v => v.toUpperCase()),

    target_drives: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),

    target_path: z.string().transform(v => v.toUpperCase()).nullable(),

    project_focus: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
    project_area: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
    project_type: z.array(z.string()).min(1, REQUIRED_SELECTION_MESSAGE),
});


export default CRITERIA_SCHEMA