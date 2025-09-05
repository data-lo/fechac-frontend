// 1. Componentes globales
import EmptyState from "@/components/empty-state";
import NavigationBreadcrumb from "@/components/breadcrumb";
import ModalComponent from "@/components/modal";

// 2. Componentes compartidos
// (ninguno en este caso)

// 3. Componentes locales del módulo
import RestrictionTable from "./components/restriction-table";
import CreateNomenclatureForm from "./create/create-restriction-form";

// 4. Actions/Servicios
import getRestrictions from "./create/actions/get-restrictions";

const ViewNomenclatureSection = async () => {

    const restrictions = await getRestrictions();

    const breadcrumbRoutes = [
        {
            href: '',
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
                    dialogTitle={"Restricción"}
                    dialogDescription={"Aquí puedes establecer restricciones que determinan cómo deben nombrarse los archivos."}
                    iconName={"Plus"}
                    buttonSize="w-[338px]"
                    dialogTrigger={"Crear Restricción"}
                    children={<CreateNomenclatureForm />}
                />
            </div>

            {restrictions.length > 0 ? (
                <RestrictionTable
                    restrictions={restrictions}
                />
            ) : (
                <EmptyState
                    text={"No hay restricciones disponibles"}
                />
            )}

        </div>
    )
}

export default ViewNomenclatureSection;
