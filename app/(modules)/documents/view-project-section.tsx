import { Fragment } from "react";

import AlertMessage from "@/components/alert-message";
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";


import LimitSelector from "@/components/limit-selector";
import PaginationComponent from "@/components/pagination";

import { toPlain } from "./functions/toPlain";
import DocumentsTable from "./components/document-table";

import { getPendingDocuments } from "./actions/get-pending-documents";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewDocumentSection = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const page = Math.max(1, Number(params?.page) || 1);

    const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

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
    <div className="px-6 py-4 flex flex-col h-screen gap-6 relative overflow-auto pt-16">
      <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
        <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
      </nav>

      {files.length > 0 ? (
        <Fragment>
          <div className="flex items-center gap-2">
            <LimitSelector
              currentLimit={limit}
              route="/documents"
            />
          </div>

          <DocumentsTable data={filesPlain} />
        </ Fragment>
      ) : (
        <EmptyState text={"No hay documentos disponibles"} />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        baseUrl="/documents"
      />
    </div>
  );
};

export default ViewDocumentSection;
