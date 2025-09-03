import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_CRITERIA_SCHEMA = z.object({
    file_name: z.string().min(1, REQUIRED_FIELD),
    form_code: z.string().min(1, REQUIRED_FIELD),
    form_title: z.string().min(1, REQUIRED_FIELD),
    issuing_organization: z.string().min(1, REQUIRED_FIELD),
    revision_number: z.string().min(1, REQUIRED_FIELD),
    revision_date: z.date({ required_error: REQUIRED_FIELD }),
    access_url: z.string({ required_error: REQUIRED_FIELD }),
    file_type: z.string({ required_error: REQUIRED_FIELD }),
    main_sections: z.array(z.string()).optional(),
    standard_fields: z.array(z.string()).optional(),
    // visual_layout: z.array(z.string()).optional(),
    domain_tags: z.array(z.string()).optional(),
    additional_keywords: z.array(z.string()).optional(),
    destination_drive: z.string({ required_error: REQUIRED_FIELD }),
    destination_path: z.string({ required_error: REQUIRED_FIELD }),
    department: z.string({ required_error: REQUIRED_FIELD }),
});

export { BASE_CRITERIA_SCHEMA };
