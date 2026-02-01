import UpdateDocumentSection from "./update-documents-section";

import getDocument from "@/actions/files/get-document";
import getAllCriteria from "@/actions/criteria/get-all-criteria";

export default async function UpdateDocumentPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // Validación del id
    if (!id || typeof id !== "string") {
        console.error("[ERROR] Invalid or missing id parameter:", { params, id });
        return (
            <div className="p-8 text-center text-red-600">
                ID de documento inválido.
            </div>
        );
    }

    const documentResponse = await getDocument(id);
    const criteriaResponse = await getAllCriteria();

    // Validaciones de respuesta
    if (!documentResponse.success || !documentResponse.data) {
        return (
            <div className="p-8 text-center text-red-600">
                El documento solicitado no existe o no pudo ser cargado.
            </div>
        );
    }

    if (!criteriaResponse.success || !criteriaResponse.data) {
        return (
            <div className="p-8 text-center text-red-600">
                No se pudieron obtener los criterios necesarios para actualizar el documento.
            </div>
        );
    }

    return (
        <UpdateDocumentSection
            data={{
                document: documentResponse.data.document,
                criteria: criteriaResponse.data.criteria,
            }}
        />
    );
}
