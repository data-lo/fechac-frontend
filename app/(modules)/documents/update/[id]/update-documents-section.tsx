'use client'

// React
import { Fragment } from "react";

// UI components
import AlertMessage from "@/components/alert-message";
import NavigationBreadcrumb from "@/components/breadcrumb";
import { StatisticCard } from "@/components/statistic-card";

// Page components
import DocumentUpdateForm from "./components/document-update-form";
import DocumentLocationCard from "./components/document-loaction-card";

// Domain models
import { DocumentEntity } from "../../models/document-entity";
import { CriterionEntity } from "@/app/(modules)/criteria/models/criterion-entity";

// Icons
import { CheckCircle2, Users } from "lucide-react";

interface Props {
    data: {
        document: DocumentEntity,
        criteria: CriterionEntity[],
    }
}

const UpdateDocumentSection = ({ data }: Props) => {
    const summary = [
        {
            title: "ESTATUS",
            value: data.document.status,
            icon: CheckCircle2,
            iconColor: "text-green-600",
            iconBgColor: "bg-green-50",
        },
        {
            title: "DEPARTAMENTO",
            value: data.document.department,
            icon: Users,
            iconColor: "text-purple-600",
            iconBgColor: "bg-purple-50",
        },
    ];

    const breadcrumbRoutes = [
        {
            href: '/documents/view',
            title: "DOCUMENTOS"
        },
        {
            href: `#`,
            title: `ACTUALIZAR DOCUMENTO: ${data.document.file_name.toUpperCase()}`
        }
    ];

    const criteria = data.criteria.map(item => ({
        label: item.file_name,
        value: item._id
    }));

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <h2 className="font-bold">INFORMACIÓN</h2>

            <div className="flex gap-4 w-full">
                {summary.map(item => (
                    <StatisticCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        iconBgColor={item.iconBgColor}
                    />
                ))}
            </div>

            <DocumentLocationCard
                path={data.document.path}
                webUrl={data.document.metadata.web_url}
            />

            {!data.document.sadap_id && (
                <Fragment>
                    <h2 className="font-bold">FORMULARIO</h2>

                    <AlertMessage
                        message="Este documento no está vinculado a ningún proyecto. Por favor, realiza la asignación manual. Una vez completada, no podrá modificarse."
                        showActions={false}
                        buttonText=""
                        variant='warning'
                    />

                    <DocumentUpdateForm
                        data={{
                            document: data.document,
                            criteriaItems: criteria
                        }}
                    />
                </ Fragment>
            )}
        </Fragment>
    );
};
export default UpdateDocumentSection;