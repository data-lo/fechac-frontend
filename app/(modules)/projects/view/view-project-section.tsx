// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 3. Componentes compartidos
import PaginationComponent from "../../../../components/pagination";

// 4. Componentes locales del módulo
import ProjectTable from "./components/project-table";

// 5. Actions/Servicios
import { getPendingProjects } from "./actions/get-pending-projects-action";
import Modal from "@/components/modal";
import UploadFileForm from "./components/upload-file-form";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewProjectSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 100));

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
    <Fragment>
      {/* Navigation Bar - Fixed Height */}
      <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
        <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
      </nav>

      <div className="flex justify-end">
        <Modal
          dialogTitle={"Cargar Proyectos"}
          dialogTrigger="Cargar Proyectos"
          iconName="FileUp"
          dialogSize="3xl"
        >
          <UploadFileForm />
        </Modal>
      </div>

      {projects.length > 0 ? (
        <Fragment>
          <ProjectTable
            data={projects}
            currentIndex={page * limit}
          />
        </ Fragment>
      ) : (
        <EmptyState text={"No hay proyectos disponibles"} />
      )}

      {/* Pagination - Fixed at Bottom */}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        baseUrl="/projects/view"
      />
    </Fragment>
  );
};

export default ViewProjectSection;