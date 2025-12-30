import * as z from "zod";

import { REQUIRED_FIELD } from "@/messages/form-messages";

import { PeriodicityEnum } from "@/enums/periodicity-enum";

const SCHEDULE_SCHEMA = z.object({
    periodicity: z.nativeEnum(PeriodicityEnum, {
        required_error: REQUIRED_FIELD,
    }),

    triggerNow: z.boolean(),
});

export default SCHEDULE_SCHEMA;