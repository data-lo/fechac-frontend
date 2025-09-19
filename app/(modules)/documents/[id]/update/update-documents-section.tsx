'use client'
import { title } from "process";
import { FileDocument } from "../../models/file-document";
import DocumentUpdateForm from "./components/document-update-form";
import NavigationBreadcrumb from "@/components/breadcrumb";

interface Props {
    data: {
        document: FileDocument
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
            title: `ACTUALIZAR DOCUMENTO: ${data.document.uuid}`
        }
    ];
    return (
        <div className="px-6 py-4 flex flex-col h-full gap-6 relative overflow-auto pt-16">
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

            <DocumentUpdateForm
                data={{ document: data.document }}
            />
        </div>
    );
};
export default UpdateDocumentSection;