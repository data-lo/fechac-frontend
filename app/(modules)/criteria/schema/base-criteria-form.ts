import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_CRITERIA_SCHEMA = z.object({
    access_url: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    additional_keywords: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    department: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    destination_drive: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    destination_path: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    domain_tags: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    file_name: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    file_type: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),

    form_code: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    form_title: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

    issuing_organization: z
        .string()
        .transform((val) => val.toUpperCase()),

    main_sections: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

    revision_number: z
        .string()
        .transform((val) => val.toUpperCase()),

    standard_fields: z
        .array(z.string().transform((val) => val.toUpperCase()))
        .transform(item => item.filter(item => item.trim() !== ""))
        .optional(),

});


export { BASE_CRITERIA_SCHEMA };
