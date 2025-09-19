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
import ContextMenu from "@/components/context-menu"
import ActionButton from "@/components/action-button"




import { getStatusInfo, DocumentStatusEnum } from "../functions/get-status-translation"
import { FileDocument } from "../models/file-document"

interface Props {
    data: FileDocument[]
}

const DocumentsTable = ({ data }: Props) => {
    const router = useRouter();

    const getExt = (p: string) => p.split('.').pop()?.toLowerCase() ?? '-';

    const handleEdit = (documentId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/documents/${encodeURIComponent(documentId)}/update`)
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16 whitespace-nowrap">#</TableHead>
                    <TableHead className="min-w-0">NOMBRE</TableHead>
                    <TableHead className="">TIPO DE DOCUMENTO</TableHead> 
                    <TableHead className="">ESTATUS</TableHead>
                    <TableHead className="w-24"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((document, index) => {
                    const statusInfo = getStatusInfo(document.status as DocumentStatusEnum);
                    const IconComponent = statusInfo.icon;
                    
                    return (
                        <TableRow key={index}>
                            <TableCell className="text-center text-gray-500">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="line-clamp-2 leading-tight" title={document.uuid}>
                                    {document.uuid}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">
                                {getExt(document.path)}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusInfo.className}`}>
                                    <IconComponent size={12} />
                                    {statusInfo.text}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <ContextMenu>
                                    <ActionButton
                                    title="Editar"
                                    className="w-auto"
                                    variant={"ghost"}
                                    onClick={handleEdit(String(document._id))}
                                />
                                </ContextMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default DocumentsTable;