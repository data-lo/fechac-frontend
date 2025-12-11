import getCollection from "@/actions/mongo/get-collection";

import { FileDocument } from "@/app/(modules)/documents/models/document-entity";

const getDocumentsByProject = async (sadapId: string) => {
    const collection = await getCollection<FileDocument>("documents");

    const cursor = collection.find({ sadap_id: sadapId });

    const documents = await cursor.toArray();

    return documents.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
    }));
};

export default getDocumentsByProject;
