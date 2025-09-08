import * as z from "zod";
import BASE_RESTRICTION_SCHEMA from "../../schema/base-restriction-schema";


const UPDATE_RESTRICTION_SCHEMA = BASE_RESTRICTION_SCHEMA.extend({
    _id: z.string()
});

export default UPDATE_RESTRICTION_SCHEMA ;
