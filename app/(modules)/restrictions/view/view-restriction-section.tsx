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
import getRestrictions from "../../../../actions/restrictions/get-restrictions";
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

    return (
        <Fragment>
           
            <div className="flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
                <ModalComponent
                    dialogTitle={"Crear Restricción"}
                    dialogDescription={
                        "Aquí puedes crear los caracteres restrictivos. Al nombrar los archivos finales, se excluirán todos los caracteres que hayas creado y que estén activos."
                    }
                    iconName={"CirclePlus"}
                    buttonSize="w-auto"
                    dialogTrigger={"Nuevo"}
                    
                >
                    <CreateRestrictionForm />
                </ModalComponent>
            </div>

            {restrictions.length > 0 ? (
                <Fragment>
                    <RestrictionTable
                        restrictions={restrictions}
                    />
                </ Fragment>
            ) : (
                <EmptyState text={"No hay restricciones disponibles"} />
            )}

            <PaginationComponent
                currentPage={page}
                totalPages={totalPages}
                limit={limit}
                baseUrl="/restrictions"
            />

        </Fragment>
    )
}

export default ViewNomenclatureSection;
