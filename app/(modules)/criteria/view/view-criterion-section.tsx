// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptySate from "@/components/empty-state";

// 3. Componentes compartidos
import PaginationComponent from "@/components/pagination";
import CriterionTable from "./components/criterion-table";

// 4. Componentes locales del módulo

import CreateCriterionButtonSection from "../components/create-criterion-button-section";
import { getCriteria } from "@/actions/criteria/get-criteria";

// 5. Actions/Servicios


interface Props {
  searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewCriterionSection = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const limit = Math.max(1, Math.min(100, Number(params?.limit) || 50));

  const response = await getCriteria(page, limit);

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
      href: '#',
      title: 'CRITERIOS'
    },
  ];

  return (
    <Fragment>
      <CreateCriterionButtonSection />

      {criteria.length > 0 ? (
        <Fragment>
          <CriterionTable
            data={criteria}
            currentIndex={(page * limit) - 50}
          />

          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            baseUrl="/criteria/view"
          />
        </Fragment>
      ) : (
        <EmptySate text={"No hay proyectos disponibles"} />
      )}
    </Fragment>
  );
};

export default ViewCriterionSection;