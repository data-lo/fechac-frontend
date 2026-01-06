import { Fragment } from "react";

import { toPlain } from "../functions/to-plain";

import EmptyState from "@/components/empty-state";
import AlertMessage from "@/components/alert-message";
import DocumentsTable from "./components/document-table";
import PaginationComponent from "@/components/pagination";
import NavigationBreadcrumb from "@/components/breadcrumb";

import { getPendingDocumentsAction } from "../actions/get-pending-documents-action";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewDocumentSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 100));

  const response = await getPendingDocumentsAction(page, limit);

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
  const filesPlain = toPlain(files)

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

  const breadcrumbRoutes = [
    {
      href: '#',
      title: 'DOCUMENTOS'
    },
  ];

  return (
    <Fragment >
      <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
        <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
      </nav>

      {files.length > 0 ? (
        <Fragment>

          <DocumentsTable
            data={filesPlain}
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
