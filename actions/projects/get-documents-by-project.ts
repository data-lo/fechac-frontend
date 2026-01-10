import FileDocument from "@/models/files/file-document";

import getDb from "@/infrastructure/persistence/mongo/get-db";

const getDocumentsByProject = async (sadapId: string): Promise<FileDocument[]> => {
    const db = await getDb();

    const cursor = db.files.find({ sadap_id: sadapId });

    const documents = await cursor.toArray();

    return documents.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
    }));
};

export default getDocumentsByProject;
