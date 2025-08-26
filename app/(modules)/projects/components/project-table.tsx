import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Project } from "../models/project";
import { getStatusInfo, PROJECT_STATUS_ENUM } from "../functions/get-status-translation";

interface Props {
    data: Project[]
}

const ProjectTable = ({ data }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16 whitespace-nowrap">#</TableHead>
                    <TableHead className="min-w-0">NOMBRE</TableHead>
                    <TableHead className="w-32 whitespace-nowrap">SADAP ID</TableHead>
                    <TableHead className="w-52 whitespace-nowrap">ESTATUS</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((project, index) => {
                    const statusInfo = getStatusInfo(project.transfer_status as PROJECT_STATUS_ENUM);
                    const IconComponent = statusInfo.icon;
                    
                    return (
                        <TableRow key={index}>
                            <TableCell className="text-center text-gray-500">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="line-clamp-2 leading-tight" title={project.project_name}>
                                    {project.project_name}
                                </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                                {project.sadap_id}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusInfo.className}`}>
                                    <IconComponent size={12} />
                                    {statusInfo.text}
                                </span>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ProjectTable;