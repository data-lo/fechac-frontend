
import { DocumentEntity } from "@/app/(modules)/documents/models/document-entity";
import { getDb } from "@/lib/get-db";

const getDocumentsByProject = async (sadapId: string) => {
    const db = await getDb();

    const cursor = db.projects.find({ sadap_id: sadapId });

    const documents = await cursor.toArray();

    return documents.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
    }));
};

export default getDocumentsByProject;
