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
import ProjectDocument from "@/models/projects/project-document";


// 3. Utilidades/Funciones
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ActionButton from "@/components/action-button";
import { getStatusInfo, ProjectStatus } from "../../functions/get-status-translation";

interface Props {
    data: ProjectDocument[];
    currentIndex: number;
}

const ProjectTable = ({ data, currentIndex }: Props) => {

    const router = useRouter();

    const redirectAction = (project_id: string) => {
        router.push(`/projects/update/${project_id}`)
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableHead className="w-[50px] text-center"></TableHead>
                    <TableHead className="max-w-[380px]">Name</TableHead>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[340px]">Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((project, index) => {
                    const statusInfo = getStatusInfo(project.status as ProjectStatus);

                    const IconComponent = statusInfo.icon;

                    return (
                        <TableRow key={index} className="text-xs">
                            <TableCell className="text-center text-gray-500 font-medium">
                                {currentIndex + index + 1}
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
                                <Badge
                                    variant="outline"
                                    className="gap-1"
                                >
                                    <IconComponent className="w-3 h-3" />
                                    {statusInfo.text.charAt(0).toUpperCase() + statusInfo.text.slice(1)}
                                </Badge>
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