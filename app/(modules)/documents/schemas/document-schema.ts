import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

import { ProjectStatusEnum } from "@/enums/project-status-enum";

const DOCUMENT_SCHEMA = z.object({

    file_name: z
        .string()
        .min(1, REQUIRED_FIELD)
        .transform((val) => val.toUpperCase()),

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
        .string({ required_error: REQUIRED_FIELD }),

    web_url: z
        .string({ required_error: REQUIRED_FIELD }),

    status: z.nativeEnum(ProjectStatusEnum, {
        required_error: REQUIRED_FIELD,
    }),

    one_drive_item_id: z
        .string({ required_error: REQUIRED_FIELD })

});

export default DOCUMENT_SCHEMA ;