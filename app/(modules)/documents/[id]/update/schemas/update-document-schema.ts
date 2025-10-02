import * as z from "zod";
import { BASE_DOCUMENT_SCHEMA } from "../../../schema/base-document-form";

const UPDATE_DOCUMENT_SCHEMA = BASE_DOCUMENT_SCHEMA.extend({
    _id: z.string(),
    metadata: z.record(z.any()),
});

export { UPDATE_DOCUMENT_SCHEMA };