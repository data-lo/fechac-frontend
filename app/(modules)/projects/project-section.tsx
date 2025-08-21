// app/projects/ProjectSection.tsx
import { Fragment } from "react";
import UploadFileSection from "./upload-file-section";

import { getPendingProjects } from "./actions/get-pending-projects-action";
import Pagination from "./components/pagination";
import LimitSelector from "./components/limit-selector";

interface Props {
  searchParams?: { page?: string; limit?: string };
}

const ProjectSection = async ({ searchParams }: Props) => {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(searchParams?.limit) || 10));

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

      {/* Lista de proyectos */}
      {projects.length > 0 ? (
        <div className="bg-white border rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {projects.map((project, index) => (
              <li key={project._id.toString()} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{project.project_name}</span>
                  <span className="text-sm text-gray-500">
                    #{(page - 1) * limit + index + 1}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay proyectos disponibles
        </div>
      )}

      {/* Componente de paginación */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
      />
    </Fragment>
  );
};

export default ProjectSection;