
import { FileDocuments } from "@/app/(modules)/documents/models/file-document";
import { getDb } from "@/lib/get-db";

const getDocumentsByProject = async (sadapId: string): Promise<DocumentEntity> => {
    const db = await getDb();

    const cursor = db.documents.find({ sadap_id: sadapId });

    const documents = await cursor.toArray();

    return documents.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
    }));
};

export default getDocumentsByProject;
