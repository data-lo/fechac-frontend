// 1. React
import { Fragment } from "react";

// 2. External libraries / icons
import { CheckCircle2, FolderOpen, Workflow, Building2, Target, MapPin, Layers } from "lucide-react";

// 3. Shared / global components
import EmptyMessage from "@/components/empty-message";
import { StatisticCard } from "@/components/statistic-card";

// 4. Domain enums / constants
import { ProjectStatus } from "@/enums/project-status";

// 5. Local module components
import DocumentTable from "../../components/document-table";


// 6. Models / entities
import FileDocument from "@/models/files/file-document";
import ProjectDocument from "@/models/projects/project-document";

// 7. Functions
import { getStatusTranslation } from "../../functions/get-status-translation";


interface Props {
    project: ProjectDocument;
    documents: FileDocument[];

}
export default async function UpdateProjectSection({
    project,
    documents
}: Props) {
    const status = getStatusTranslation(project.status as ProjectStatus)

    const stats = [
        // Row 1
        {
            title: "ESTATUS",
            value: status,
            icon: CheckCircle2,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        {
            title: "LOTE DE TRANSFERENCIA",
            value: "v14",
            icon: Workflow,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        {
            title: "DOCUMENTOS ASOCIADOS",
            value: documents.length,
            icon: FolderOpen,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        // Row 2 - Former Text Block
        {
            title: "CONSEJO",
            value: project.municipality,
            icon: Building2,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        {
            title: "ENFOQUE",
            value: project.area,
            icon: Target,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
        {
            title: "ÁREA",
            value: project.support_area,
            icon: Layers,
            iconColor: "text-black",
            iconBgColor: "bg-gray-100",
        },
    ];

    return (
        <Fragment>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {stats.map((item, i) => (
                    <StatisticCard
                        key={item.title + i}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        iconBgColor={item.iconBgColor}
                    />
                ))}
            </div>

            <h2 className=" text-black font-semibold"> Documentos del Proyecto</h2>

            <div className="mt-8">
                {documents.length > 0 ? (
                    <DocumentTable data={documents} />
                ) : (
                    <EmptyMessage text="¡No hay documentos asociados a este proyecto!" />
                )}
            </div>

        </Fragment >
    );
}