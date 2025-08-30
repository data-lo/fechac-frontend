// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptySate from "@/components/empty-state";

// 3. Componentes compartidos
import LimitSelector from "../../../components/limit-selector";
import PaginationComponent from "../../../components/pagination";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 4. Componentes locales del módulo
import CriterionTable from "./components/criterion-table";

// 5. Actions/Servicios
import { getCriteria } from "./actions/get-criteria";


interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewCriterionSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

  const query = params?.query;

  const response = await getCriteria(page, limit);

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
  const { criteria, total } = response.data;

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
      href: '',
      title: 'CRITERIOS'
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <nav className="h-12 flex justify-between items-center px-6 bg-white sticky top-0 z-10">
        <NavigationBreadcrumb
          breadcrumbRoutes={breadcrumbRoutes}
        />
      </nav>

      {criteria.length > 0 ? (
        <div className="px-6 py-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <LimitSelector currentLimit={limit} route="/criteria" />
          </div>

          <CriterionTable data={criteria} />
        </ div>
      ) : (
        <EmptySate text={"No hay proyectos disponibles"} />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        limit={limit}
        baseUrl="/criteria"
      />
    </div>
  );
};

export default ViewCriterionSection;