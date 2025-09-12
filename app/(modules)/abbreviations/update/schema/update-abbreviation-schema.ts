import * as z from "zod";
import { BASE_ABBREVIATION_SCHEMA } from "../../schema/base- abbreviation-schema";


const UPDATE_ABBREVIATION_SCHEMA = BASE_ABBREVIATION_SCHEMA.extend({
    _id: z.string()
});

export default UPDATE_ABBREVIATION_SCHEMA ;
