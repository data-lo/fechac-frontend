'use client'

import NavigationBreadcrumb from "@/components/breadcrumb";

import { DocumentEntity } from "../../models/document-entity";

import DocumentUpdateForm from "./components/document-update-form";
import { Fragment } from "react";
import DocumentCard from "./components/document-card";
import { CriterionEntity } from "@/app/(modules)/criteria/models/criterion-entity";
import AlertMessage from "@/components/alert-message";

interface Props {
    data: {
        document: DocumentEntity,
        criteria: CriterionEntity[],
    }
}

const UpdateDocumentSection = ({ data }: Props) => {

    const breadcrumbRoutes = [
        {
            href: '/document',
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

            <DocumentCard document={data.document} />

            <h2 className="font-bold">FORMULARIO</h2>

            <AlertMessage
                message="Este documento no está vinculado a ningún proyecto. Por favor, realiza la asignación manual."
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
        </Fragment>
    );
};
export default UpdateDocumentSection;