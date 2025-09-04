import { MAX_CHARACTERS, MIN_CHARACTERS } from "@/messages/form-messages";
import * as z from "zod";

const BASE_NOMENCLATURE_SCHEMA = z.object({
    character: z.string()
        .min(1, { message: MIN_CHARACTERS })
        .max(1, { message: MAX_CHARACTERS })
});

export { BASE_NOMENCLATURE_SCHEMA };
