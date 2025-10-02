// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 3. Componentes compartidos
import LimitSelector from "../../../components/limit-selector";
import PaginationComponent from "../../../components/pagination";

// 4. Componentes locales del módulo
import UploadFileSection from "./upload-file-section";
import ProjectTable from "./components/project-table";

// 5. Actions/Servicios
import { getPendingProjects } from "./actions/get-pending-projects-action";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewProjectSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

  const response = await getPendingProjects(page, limit);

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
  const { projects, total } = response.data;

  const totalPages = Math.ceil(total / limit);

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
      title: 'PROYECTOS'
    },
  ];

  return (
    <div className="px-6 py-4 flex flex-col h-screen gap-6 relative overflow-auto pt-16">
      <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
        <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
      </nav>

      <UploadFileSection />

      {projects.length > 0 ? (
        <Fragment>
          <div className="flex items-center gap-2">
            <LimitSelector
              currentLimit={limit}
              route="/projects"
            />
          </div>

          <ProjectTable data={projects} />
        </ Fragment>
      ) : (
        <EmptyState text={"No hay proyectos disponibles"} />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        baseUrl="/projects"
      />
    </div>
  );
};

export default ViewProjectSection;