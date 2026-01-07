import { Fragment } from "react";
import { CheckCircle2, FolderOpen, Workflow} from "lucide-react";

import NavigationBreadcrumb from "@/components/breadcrumb";
import { StatisticCard } from "@/components/statistic-card";
import EmptyMessage from "@/components/empty-message";

import { ProjectStatusEnum } from "@/enums/project-status-enum";

import { DocumentEntity } from "@/app/(modules)/documents/models/document-entity";
import { ProjectDocument } from "../../models/project-document";

import { getStatusTranslation } from "../../functions/get-status-translation";

import DocumentTable from "../../components/document-table";

interface Props {
    project: ProjectDocument;
    documents: DocumentEntity[];

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
            href: '/projects/view',
            title: 'PROYECTOS'
        },
        {
            href: '#',
            title: `PROYECTO ${project.sadap_id}`
        },
    ];

    return (
        <Fragment>

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

            {documents.length > 0 && (
                <DocumentTable data={documents} />
            )}

            {documents.length === 0 && (
                <EmptyMessage text="¡No hay documentos asociados a este proyecto!" />

            )}
        </Fragment >
    );
}