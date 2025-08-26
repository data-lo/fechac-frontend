import { Fragment } from "react";

import LimitSelector from "../../../components/limit-selector-component";

import PaginationComponent from "../../../components/pagination-component";

import EmptySate from "@/components/empty-state";
import AlertMessage from "@/components/alert-message";
import { getPendingProjects } from "../projects/actions/get-pending-projects-action";

interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewCriteriaSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

  const query = params?.query;

  const response = await getPendingProjects(page, limit);

  if (response.error || !response.data) {
    return (
      <Fragment>
        <AlertMessage
          buttonText="Recargar Página"
          message={response.error}
        />
      </Fragment>
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

  return (
    <Fragment>
      <h1 className="font-bold text-xl">Criterios</h1>

      {projects.length > 0 ? (
        <Fragment>
          <div className="flex items-center gap-2">
            <LimitSelector currentLimit={limit} />
          </div>

          {/* <ProjectTable data={projects} /> */}
        </ Fragment>
      ) : (
        <EmptySate text={"No hay proyectos disponibles"} />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
      />
    </Fragment>
  );
};

export default ViewCriteriaSection;