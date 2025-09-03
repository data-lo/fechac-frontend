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
import CreateCriterionButtonSection from "./create/components/create-criterion-button-section";


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
    <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto">
      <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
        <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
      </nav>
      <div className="mt-10"></div>

      <CreateCriterionButtonSection />

      {criteria.length > 0 ? (
        <Fragment>
          <LimitSelector currentLimit={limit} route="/criteria" />

          <CriterionTable data={criteria} />

          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            baseUrl="/criteria"
          />
        </Fragment>
      ) : (
        <EmptySate text={"No hay proyectos disponibles"} />
      )}
    </div>
  );
};

export default ViewCriterionSection;