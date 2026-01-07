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

import Modal from "@/components/modal";
import UploadFileForm from "./components/upload-file-form";
import { getPendingProjects } from "@/actions/projects/get-pending-projects-action";

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
            currentIndex={(page * limit) - 100}
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