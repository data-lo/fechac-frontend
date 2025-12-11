import * as z from "zod";

import DOCUMENT_SCHEMA from "./document-schema";

const UPDATE_DOCUMENT_SCHEMA = DOCUMENT_SCHEMA.extend({
    _id: z.string(),
});

export default UPDATE_DOCUMENT_SCHEMA;