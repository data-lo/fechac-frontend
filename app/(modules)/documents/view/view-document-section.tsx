import { Fragment } from "react";

// Actions
import getPendingDocuments from "@/actions/files/get-pending-documents";

// Shared components
import EmptyState from "@/components/empty-state";
import AlertMessage from "@/components/alert-message";
import PaginationComponent from "@/components/pagination";

// Local components
import DocumentsTable from "./components/document-table";
import DescriptionText from "@/components/description-text";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewDocumentSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 100));

  const response = await getPendingDocuments(page, limit);

  if (response.error || !response.data) {
    return (
      <div className="px-6 py-4">
        <AlertMessage
          buttonText="Recargar Página"
          message={response.error}
        />
      </div>
    );
  }

  const { files, total } = response.data;

  const totalPages = Math.ceil(total / limit)

  if (page > totalPages && totalPages > 0) {
    return (
      <Fragment>
        <AlertMessage
          buttonText="Regresar"
          message={`La página ${page} no existe. Hay ${totalPages} páginas disponibles.`}
        />
      </Fragment>
    );
  }


  return (
    <Fragment >
      <DescriptionText>
        Aquí se muestran los documentos para los cuales no fue posible{" "}
        <span className="font-medium text-gray-700">
          clasificar el documento automáticamente
        </span>{" "}
        ni{" "}
        <span className="font-medium text-gray-700">
          identificar el proyecto al que pertenecen
        </span>.
      </DescriptionText>

      {files.length > 0 ? (
        <Fragment>

          <DocumentsTable
            data={files}
            currentIndex={(page * limit) - 100}
          />
        </ Fragment>
      ) : (
        <EmptyState text={"No hay documentos disponibles"} />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        baseUrl="/documents/view"
      />
    </Fragment>
  );
};

export default ViewDocumentSection;
