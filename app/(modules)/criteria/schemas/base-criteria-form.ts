import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_CRITERIA_SCHEMA = z.object({
    file_name: z.string().min(1, REQUIRED_FIELD).transform((val) => val.toUpperCase()),
    form_code: z.string().min(1, REQUIRED_FIELD).transform((val) => val.toUpperCase()),
    form_title: z.string().min(1, REQUIRED_FIELD).transform((val) => val.toUpperCase()),
    issuing_organization: z.string().min(1, REQUIRED_FIELD).transform((val) => val.toUpperCase()),
    revision_number: z.string().min(1, REQUIRED_FIELD).transform((val) => val.toUpperCase()),
    access_url: z.string({ required_error: REQUIRED_FIELD }).transform((val) => val.toUpperCase()),
    file_type: z
        .string({ required_error: REQUIRED_FIELD })
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),
    main_sections: z.array(z.string().transform((val) => val.toUpperCase())).optional(),
    standard_fields: z.array(z.string().transform((val) => val.toUpperCase())).optional(),
    domain_tags: z.array(z.string().transform((val) => val.toUpperCase())).optional(),
    additional_keywords: z.array(z.string().transform((val) => val.toUpperCase())).optional(),
    destination_drive: z.string({ required_error: REQUIRED_FIELD }).transform((val) => val.toUpperCase()),
    destination_path: z.string({ required_error: REQUIRED_FIELD }).transform((val) => val.toUpperCase()),
    department: z
        .string({ required_error: REQUIRED_FIELD })
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),
    revision_date: z.date({ required_error: REQUIRED_FIELD }),
});


export { BASE_CRITERIA_SCHEMA };
