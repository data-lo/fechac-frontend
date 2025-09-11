'use client'

// 1. Componentes globales
import NavigationBreadcrumb from "@/components/breadcrumb";

// 2. Componentes locales de la ruta
import CreateCriterionForm from "./components/create-criterion-form";


const CreateCriterionSection = () => {

    const breadcrumbRoutes = [
        {
            href: '/criteria',
            title: 'CRITERIOS'
        },
        {
            href: '#',
            title: `CREAR CRITERIO`
        }
    ];

    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto pt-16">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <CreateCriterionForm />
        </div>

    );
};
export default CreateCriterionSection;