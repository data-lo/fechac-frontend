'use client'

// 1. Next.js hooks
import { useRouter } from "next/navigation";

// 2. External libraries / icons
import { AlertTriangle, CircleArrowRight } from "lucide-react";

// 3. Shared / UI components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionButton from "@/components/action-button";

// 4. Domain enums / helpers
import {
    FileStatus,
    getStatusInfo,
} from "../../documents/functions/get-status-translation";

// 5. Models / entities
import FileDocument from "@/models/files/file-document";
import { Badge } from "@/components/ui/badge";

interface Props {
    data: FileDocument[];
}

const STATUS_REQUIERE_REVISION: FileStatus[] = [
    FileStatus.REQUIRES_HUMAN_REVIEW,
    FileStatus.NOT_CLASSIFIED,
    FileStatus.WEIGHT_BELOW_THRESHOLD,
];

const DocumentsTable = ({ data }: Props) => {
    const router = useRouter();

    const handleEdit = (documentId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/documents/update/${encodeURIComponent(documentId)}`)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableHead className="w-[50px] text-center"></TableHead>
                    <TableHead className="w-[40px] text-center"></TableHead>
                    <TableHead className="max-w-[300px]">Document Name</TableHead>
                    <TableHead className="w-[200px]">Department</TableHead>
                    <TableHead className="w-[340px]">Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((document, index) => {
                    const statusInfo = getStatusInfo(document.status as FileStatus);
                    const IconComponent = statusInfo.icon;

                    const requiereRevision =
                        STATUS_REQUIERE_REVISION.includes(document.status as FileStatus);

                    return (
                        <TableRow key={index}>

                            <TableCell className="text-center text-gray-500">
                                {index + 1}
                            </TableCell>

                            {/* Fila extra con icono de revisión */}
                            <TableCell className="text-center">
                                {requiereRevision && (
                                    <AlertTriangle
                                        size={18}
                                        className="text-yellow-500"
                                    />
                                )}
                            </TableCell>

                            <TableCell>
                                <div
                                    className="line-clamp-2 leading-tight"
                                    title={document.uuid}
                                >
                                    {String(document.file_name)
                                        .replace(/\.[^/.]+$/, "")
                                        .toUpperCase()}
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant="outline"
                                >
                                    {document.department}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className="gap-1"
                                >
                                    <statusInfo.icon className="w-3 h-3" />
                                    {statusInfo.text}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <ActionButton
                                    iconName="FileCog"
                                    className="w-min"
                                    variant="ghost"
                                    onClick={handleEdit(String(document._id))}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default DocumentsTable;
