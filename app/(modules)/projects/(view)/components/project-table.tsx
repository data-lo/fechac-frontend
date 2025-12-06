"use client"

// 1. Componentes UI
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// 2. Tipos/Modelos
import { ProjectDocument } from "../../models/project-document";

// 3. Utilidades/Funciones
import { getStatusInfo, ProjectStatusEnum } from "../functions/get-status-translation";
import ActionButton from "@/components/action-button";
import { useRouter } from "next/navigation";

interface Props {
    data: ProjectDocument[]
}

const ProjectTable = ({ data }: Props) => {

    const router = useRouter();

    const redirectAction = (project_id: string) => {
        router.push(`/projects/update/${project_id}`)
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead className="max-w-[380px]">NOMBRE</TableHead>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[340px]">ESTATUS</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((project, index) => {
                    const statusInfo = getStatusInfo(project.status as ProjectStatusEnum);
                    const IconComponent = statusInfo.icon;

                    return (
                        <TableRow key={index}>
                            <TableCell className="text-center text-gray-500 font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="line-clamp-1 max-w-[550px]" title={project.project_name}>
                                    {project.project_name}
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                {project.sadap_id}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm font-medium ${statusInfo.className}`}>
                                    <IconComponent size={12} />
                                    {statusInfo.text}
                                </span>
                            </TableCell>
                            <TableCell>
                                <ActionButton
                                    iconName="FolderCog"
                                    className="w-min"
                                    variant="ghost"
                                    onClick={() => redirectAction(project._id.toString())}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ProjectTable;