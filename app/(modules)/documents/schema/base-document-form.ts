import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_DOCUMENT_SCHEMA = z.object({
    uuid: z
        .string({ required_error: REQUIRED_FIELD }),
    
    path: z
        .string({ required_error: REQUIRED_FIELD }),
    
    download_url: z
        .string({ required_error: REQUIRED_FIELD }),
    
    area: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
    
    is_multimedia: z.preprocess((v) => {
        if (v === "true") return true;
        if (v === "false") return false;
        return v;
    }, z.boolean({
        required_error: REQUIRED_FIELD,
        invalid_type_error: "Debe ser true o false",
    })),

    project_id: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
    
    metadata: z.record(z.any()),

    status: z.enum(["NO_TRANSFERED", "TRANSFERED", "IN_PROCESS"], {
        required_error: REQUIRED_FIELD,
    }),

    item_id: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
          
});

export { BASE_DOCUMENT_SCHEMA };