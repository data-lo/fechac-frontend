import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_CRITERIA_SCHEMA = z.object({
    file_name: z.string({ required_error: REQUIRED_FIELD }),
    form_code: z.string({ required_error: REQUIRED_FIELD }),
    form_title: z.string({ required_error: REQUIRED_FIELD }),
    issuer: z.string({ required_error: REQUIRED_FIELD }),
    url_patter: z.string({ required_error: REQUIRED_FIELD }),
    destiny_drive: z.string({ required_error: REQUIRED_FIELD }),
    destiny_path: z.string({ required_error: REQUIRED_FIELD }),
    organization_department: z.string({ required_error: REQUIRED_FIELD }),
    mimetype: z.string({ required_error: REQUIRED_FIELD }),
    main_sections: z.array(z.string()).optional(),

});

export { BASE_CRITERIA_SCHEMA };
