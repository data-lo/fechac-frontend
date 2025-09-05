'use client'
import { CriterionDocument } from "../../models/criterion-document";
import UpdateCriterionForm from "./componentes/criterion-update-form";
import NavigationBreadcrumb from "@/components/breadcrumb";

interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const UpdateCriterionSection = ({ data }: Props) => {

    const breadcrumbRoutes = [
        {
            href: '/criteria',
            title: 'CRITERIOS'
        },
        {
            href: '',
            title: `ACTUALIZAR CRITERIO: ${data.criterion.form_title}`
        }
    ];

    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto pt-16">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <UpdateCriterionForm
                data={{ criterion: data.criterion }}
            />
        </div>
    );
};
export default UpdateCriterionSection;