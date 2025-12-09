import { Fragment } from "react";
import NavigationBreadcrumb from "@/components/breadcrumb";
import { ProjectDocument } from "../../models/project-document";
import { FileDocument } from "@/app/(modules)/documents/models/file-document";

import { StatisticCard } from "@/components/statistic-card";
import { CheckCircle2, FolderOpen, Layers, MapPin, Workflow, Wrench } from "lucide-react";
import DocumentTable from "@/app/(modules)/documents/components/document-table";

import { ProjectStatusEnum } from "@/enums/project-status-enum";
import { getStatusTranslation } from "../../functions/get-status-translation";

interface Props {
    project: ProjectDocument;
    documents: FileDocument[];

}
export default async function UpdateProjectSection({
    project,
    documents
}: Props) {
    const status = getStatusTranslation(project.status as ProjectStatusEnum)


    const summary = [
        {
            title: "ESTATUS",
            value: status,
            icon: CheckCircle2,
            iconColor: "text-green-600",
            iconBgColor: "bg-green-50",
        },
        {
            title: "LOTE DE TRANSFERENCIA",
            value: "v14",
            icon: Workflow,
            iconColor: "text-purple-600",
            iconBgColor: "bg-purple-50",
        },
        {
            title: "DOCUMENTOS ASOCIADOS",
            value: documents.length,
            icon: FolderOpen,
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-50",
        },
    ];


    const breadcrumbRoutes = [
        {
            href: '/projects',
            title: 'PROYECTOS'
        },
        {
            href: '#',
            title: `PROYECTO ${project.sadap_id}`
        },
    ];


    return (
        <Fragment>
            <nav className="h-12 flex justify-between items-center fixed top-0 left-20 right-0 z-10 bg-white px-6 border-b border-gray-200">
                <NavigationBreadcrumb breadcrumbRoutes={breadcrumbRoutes} />
            </nav>

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


            <div className="p-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">CONSEJO</p>
                        <p className="text-base font-bold">{project.municipality}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">ENFOQUE</p>
                        <p className="text-base font-bold">{project.area}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">ÁREA</p>
                        <p className="text-base font-bold">{project.support_area}</p>
                    </div>
                </div>
            </div>



            <DocumentTable data={documents} />

        </Fragment >
    );
}