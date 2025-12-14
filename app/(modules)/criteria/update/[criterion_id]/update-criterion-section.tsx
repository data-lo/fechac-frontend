'use client'
import { Fragment } from "react";

import NavigationBreadcrumb from "@/components/breadcrumb";

import { CriterionEntity } from "../../models/criterion-entity";

import UpdateCriterionForm from "./components/criterion-update-form";

interface Props {
    data: {
        criterion: CriterionEntity
    }
}

const UpdateCriterionSection = ({ data }: Props) => {

    const breadcrumbRoutes = [
        {
            href: '/criteria',
            title: 'CRITERIOS'
        },
        {
            href: `#`,
            title: `ACTUALIZAR CRITERIO: ${data.criterion.file_name}`
        }
    ];

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <UpdateCriterionForm
                data={{ criterion: data.criterion }}
            />
        </Fragment>
    );
};
export default UpdateCriterionSection;