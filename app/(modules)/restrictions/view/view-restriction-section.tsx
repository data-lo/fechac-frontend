// 1. Componentes globales
import { Fragment } from "react";
import NavigationBreadcrumb from "@/components/breadcrumb";
import EmptyState from "@/components/empty-state";
import ModalComponent from "@/components/modal";

// 2. Componentes compartidos
import AlertMessage from "@/components/alert-message";

// 3. Componentes locales del módulo
import RestrictionTable from "../components/restriction-table";
import CreateRestrictionForm from "../create/create-restriction-form";

// 4. Actions/Servicios
import getRestrictions from "../actions/get-restrictions";
import PaginationComponent from "@/components/pagination";
import LimitSelector from "@/components/limit-selector";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewNomenclatureSection = async ({ searchParams }: Props) => {

    const params = await searchParams;

    const page = Math.max(1, Number(params?.page) || 1);

    const limit = Math.max(1, Math.min(100, Number(params?.limit) || 10));

    const response = await getRestrictions(page, limit);


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
    const { restrictions, total } = response.data;

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
            title: 'RESTRICIONES'
        },
    ];

    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto pt-16">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <div className="flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
                <ModalComponent
                    dialogTitle={"Crear Restricción"}
                    dialogDescription={
                        "Aquí puedes crear los caracteres restrictivos. Al nombrar los archivos finales, se excluirán todos los caracteres que hayas creado y que estén activos."
                    }
                    iconName={"Plus"}
                    buttonSize="w-[338px]"
                    dialogTrigger={"Crear Restricción"}
                    
                >
                    <CreateRestrictionForm />
                </ModalComponent>
            </div>

            {restrictions.length > 0 ? (
                <Fragment>
                    <div className="flex items-center gap-2">
                        <LimitSelector
                            currentLimit={limit}
                            route="/restrictions"
                        />
                    </div>

                    <RestrictionTable
                        restrictions={restrictions}
                    />
                </ Fragment>
            ) : (
                <EmptyState text={"No hay proyectos disponibles"} />
            )}

            <PaginationComponent
                currentPage={page}
                totalPages={totalPages}
                limit={limit}
                baseUrl="/restrictions"
            />

        </div>
    )
}

export default ViewNomenclatureSection;
