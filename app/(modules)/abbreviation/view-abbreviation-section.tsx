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
import AbbreviationTable from "./components/view-abbreviation-table";

// 5. Actions/Servicios
import { getAbbreviations } from "./actions/get-abbreviations";


interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewAbbrevaitionSection = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const page = Math.max(1, Number(params?.page) || 1);

    const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

    const query = params?.query;

    const response = await getAbbreviations(page, limit);

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
    const { abbreviations, total } = response.data;

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
            title: 'Abreviaciones'
        },
    ];

    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto pt-16">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>


            {abbreviations.length > 0 ? (
                <Fragment>
                    <LimitSelector currentLimit={limit} route="/abbreviations" />

                    <AbbreviationTable data={abbreviations} />

                    <PaginationComponent
                        currentPage={page}
                        totalPages={totalPages}
                        limit={limit}
                        baseUrl="/criteria"
                    />
                </Fragment>
            ) : (
                <EmptySate text={"No hay abreviaciones disponibles"} />
            )}
        </div>
    );
};

export default ViewAbbrevaitionSection;