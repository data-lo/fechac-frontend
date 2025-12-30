// 1. React
import { Fragment } from "react";

// 2. Componentes globales
import AlertMessage from "@/components/alert-message";
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";

// 3. Componentes compartidos
import PaginationComponent from "@/components/pagination";

// 5. Actions / Servicios
import { getDagExecutions } from "./actions/get-dag-executions";
import DagTable from "../components/dag-table";
import { getToken } from "./actions/get-token";

const ViewWorkflowSection = async () => {
    const token = await getToken();
    const response = await getDagExecutions({ token });

    if (!response.success || !response.data) {
        return (
            <div className="px-6 py-4">
                <AlertMessage
                    buttonText="Recargar Página"
                    message={response.error ?? "Error desconocido"}
                />
            </div>
        );
    }

    const { dagRuns } = response.data;

    const breadcrumbRoutes = [{ href: "#", title: "LOTES" }];

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            {dagRuns.length > 0 ? (
                <DagTable data={dagRuns} />
            ) : (
                <EmptyState text="No hay ejecuciones disponibles" />
            )}
        </Fragment>
    );
};

export default ViewWorkflowSection;