'use client'
import { CriterionDocument } from "../../models/criterion-document";
import UpdateCriterionForm from "./componentes/criterion-update-form";
import NavigationBreadcrumb  from "@/components/breadcrumb";

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
        <div className="flex flex-col h-full">
            <nav className="h-12 flex justify-between items-center px-6 bg-white sticky top-0 z-10">
                <NavigationBreadcrumb
                    breadcrumbRoutes={breadcrumbRoutes}
                />
            </nav>

            <div className="flex-1 overflow-auto p-4">
                <UpdateCriterionForm
                    data={{ criterion: data.criterion }}
                />
            </div>
        </div>
    );
};
export default UpdateCriterionSection;