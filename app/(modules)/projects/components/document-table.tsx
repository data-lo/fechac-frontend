'use client'

import { useRouter } from "next/navigation"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import ActionButton from "@/components/action-button"
import { DocumentEntity } from "../../documents/models/document-entity"
import { DocumentStatusEnum, getStatusInfo } from "../../documents/functions/get-status-translation"

import { AlertTriangle } from "lucide-react";

interface Props {
    data: DocumentEntity[];
}

const STATUS_REQUIERE_REVISION: DocumentStatusEnum[] = [
    DocumentStatusEnum.REQUIRES_HUMAN_REVIEW,
    DocumentStatusEnum.NOT_CLASSIFIED,
    DocumentStatusEnum.WEIGHT_BELOW_THRESHOLD,
];

const DocumentsTable = ({ data }: Props) => {
    const router = useRouter();

    const handleEdit = (documentId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/documents/${encodeURIComponent(documentId)}/update`)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead className="w-[40px] text-center"></TableHead>
                    <TableHead className="max-w-[300px]">NOMBRE</TableHead>
                    <TableHead className="w-[200px]">DEPARTAMENTO</TableHead>
                    <TableHead className="w-[340px]">ESTATUS</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((document, index) => {
                    const statusInfo = getStatusInfo(document.status as DocumentStatusEnum);
                    const IconComponent = statusInfo.icon;

                    const requiereRevision =
                        STATUS_REQUIERE_REVISION.includes(document.status as DocumentStatusEnum);

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

                            <TableCell className="text-sm">
                                {document.department}
                            </TableCell>

                            <TableCell>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusInfo.className}`}
                                >
                                    <IconComponent size={12} />
                                    {statusInfo.text}
                                </span>
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
