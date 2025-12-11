'use client'

import NavigationBreadcrumb from "@/components/breadcrumb";

import { DocumentEntity } from "../../models/document-entity";

import DocumentUpdateForm from "./components/document-update-form";
import { Fragment } from "react";

interface Props {
    data: {
        document: DocumentEntity
    }
}

const getFileName = (p: string) => p.split("/").pop() ?? p;

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

    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <DocumentUpdateForm
                data={{ document: data.document }}
            />
        </Fragment>
    );
};
export default UpdateDocumentSection;