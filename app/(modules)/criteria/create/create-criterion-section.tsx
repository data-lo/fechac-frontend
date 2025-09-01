'use client'

import NavigationBreadcrumb from "@/components/breadcrumb";
import CriterionCreateForm from "./components/create-criterion-form";

const CreateCriterionSection = () => {

    const breadcrumbRoutes = [
        {
            href: '/criteria',
            title: 'CRITERIOS'
        },
        {
            href: '',
            title: `CREAR CRITERIO`
        }
    ];

    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb
                    breadcrumbRoutes={breadcrumbRoutes}
                />
            </nav>

            <div className="mt-10"></div>

            <CriterionCreateForm />
        </div>
    );
};
export default CreateCriterionSection;