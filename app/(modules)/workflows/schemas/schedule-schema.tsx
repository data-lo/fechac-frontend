import * as z from "zod";

import { Periodicity } from "@/enums/periodicity";

import { REQUIRED_FIELD } from "@/messages/form-messages";

const SCHEDULE_SCHEMA = z.object({
    periodicity: z.nativeEnum(Periodicity, {
        required_error: REQUIRED_FIELD,
    }),
});

export default SCHEDULE_SCHEMA;