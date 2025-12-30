import { getDocument } from "../actions/get-document";
import UpdateDocumentSection from "./update-documents-section";

export default async function UpdateDocumentPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    if (!id || typeof id !== 'string' ) {
        console.error('[ERROR] Invalid or missing id parameter:', { params, id });
        return <div>InvalidCriteria ID</div>
    }
    const response = await getDocument(id);

    if (!response.success || !response.data) {
        return <div className="p-8 text-center">Documento no encontrado</div>
    }

    return (
        <div className="h-screen">
            <UpdateDocumentSection data={{
                document: response.data.document
            }} />
        </div>
    );
}