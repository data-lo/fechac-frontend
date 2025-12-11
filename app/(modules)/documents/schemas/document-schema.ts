import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

import { ProjectStatusEnum } from "@/enums/project-status-enum";

const DOCUMENT_SCHEMA = z.object({
    uuid: z.string({ required_error: REQUIRED_FIELD }),
 
    sadap_id: z.string({ required_error: REQUIRED_FIELD }),

    selected_criterion_id: z.string({ required_error: REQUIRED_FIELD }),
});

export default DOCUMENT_SCHEMA;