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

import { getStatusInfo, DocumentStatusEnum } from "../../functions/get-status-translation"
import { FileDocument } from "../../models/document-entity"
import { AlertTriangle } from "lucide-react"


interface Props {
    data: FileDocument[];
    currentIndex: number;
}

const DocumentsTable = ({ data, currentIndex }: Props) => {
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
                    <TableHead className="max-w-[380px]">NOMBRE</TableHead>
                    <TableHead className="w-[100px]">PROYECTO</TableHead>
                    <TableHead className="w-[340px]">ESTATUS</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((document, index) => {
                    const statusInfo = getStatusInfo(document.status as DocumentStatusEnum);

                    const IconComponent = statusInfo.icon;

                    return (
                        <TableRow key={document.uuid} className="text-xs">

                            <TableCell className="text-center text-gray-500 font-medium">
                                {currentIndex + index + 1}
                            </TableCell>
                            <TableCell>
                                <div className="line-clamp-1 max-w-[550px]" title={document.uuid}>
                                    {String(document.file_name).replace(/\.[^/.]+$/, "").toUpperCase()}
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                {document.sadap_id && (
                                    document.sadap_id
                                )}

                                {!document.sadap_id && (
                                    <AlertTriangle size={14} className="text-yellow-600" />
                                )}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm font-medium ${statusInfo.className}`}>
                                    <IconComponent size={12} />
                                    {statusInfo.text}
                                </span>
                            </TableCell>
                            <TableCell>
                                <ActionButton
                                    iconName="FileCog"
                                    className="w-auto"
                                    variant={"ghost"}
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