import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const BASE_DOCUMENT_SCHEMA = z.object({
    uuid: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
    
    path: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
    
    download_url: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
    
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

    status: z.enum(["NOT_TRANSFERRED", "TRANSFERRED", "IN_PROGRESS"], {
        required_error: REQUIRED_FIELD,
    }),

    item_id: z
        .string({ required_error: REQUIRED_FIELD })
        .transform((val) => val.toUpperCase()),
          
});

export { BASE_DOCUMENT_SCHEMA };