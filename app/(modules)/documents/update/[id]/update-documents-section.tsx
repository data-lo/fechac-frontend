'use client'

// React
import { Fragment } from "react";

// UI components
import AlertMessage from "@/components/alert-message";
import NavigationBreadcrumb from "@/components/breadcrumb";
import { StatisticCard } from "@/components/statistic-card";

// Page components
import DocumentUpdateForm from "./components/document-update-form";
import DocumentLocationCard from "./components/document-location-card";

// Domain models
import FileDocument from "@/models/files/file-document"

// Icons
import { CheckCircle2, Users } from "lucide-react";
import CriterionDocument from "@/models/criteria/criterion-document";

interface Props {
    data: {
        document: FileDocument,
        criteria: CriterionDocument[],
    }
}

const UpdateDocumentSection = ({ data }: Props) => {
    const summary = [
        {
            title: "ESTATUS",
            value: data.document.status,
            icon: CheckCircle2,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        {
            title: "DEPARTAMENTO",
            value: data.document.department,
            icon: Users,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
    ];

    const criteria = data.criteria.map(item => ({
        label: item.file_name,
        value: item._id
    }));

    return (
        <Fragment>

            {/* <h2 className="font-bold">DOCUMENTO: {data.document.file_name.toUpperCase()}</h2> */}

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
                    {/* <h2 className="font-bold">FORMULARIO</h2> */}

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