import { Fragment } from "react";
import UploadFileSection from "./upload-file-section";

import { getPendingProjects } from "./actions/get-pending-projects-action";
import LimitSelector from "./components/limit-selector";
import ProjectTable from "./components/project-table";
import PaginationSSR from "./components/pagination-ssr";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string }>;
}


const ViewProjectSection = async ({ searchParams }: Props) => {
  const params = await searchParams;


  const page = Math.max(1, Number(params?.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

  const response = await getPendingProjects(page, limit);

  if (!response.success || !response.data) {
    return (
      <Fragment>
        <h1 className="font-bold text-xl">Proyectos</h1>
        <UploadFileSection />
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
          <p className="text-red-800">
            Error al cargar los proyectos: {response.error}
          </p>
        </div>
      </Fragment>
    );
  }

  const { projects, total } = response.data;

  const totalPages = Math.ceil(total / limit);

  if (page > totalPages && totalPages > 0) {
    return (
      <Fragment>
        <h1 className="font-bold text-xl">Proyectos</h1>
        <UploadFileSection />
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
          <p className="text-yellow-800">
            La página {page} no existe. Hay {totalPages} páginas disponibles.
          </p>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1 className="font-bold text-xl">Proyectos</h1>
      <UploadFileSection />

      <div className="flex items-center gap-2">
        <LimitSelector currentLimit={limit} />
      </div>

      {projects.length > 0 ? (<ProjectTable data={projects} />) : (
        <div className="text-center py-8 text-gray-500">
          No hay proyectos disponibles
        </div>
      )}
      
      <PaginationSSR
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
      />
    </Fragment>
  );
};

export default ViewProjectSection;