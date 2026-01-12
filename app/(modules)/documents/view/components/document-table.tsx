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

import { AlertTriangle } from "lucide-react"

import ActionButton from "@/components/action-button"

import FileDocument from "@/models/files/file-document"

import { getStatusInfo, FileStatus } from "../../functions/get-status-translation"

interface Props {
    data: FileDocument[];
    currentIndex: number;
}

const DocumentsTable = ({ data, currentIndex }: Props) => {
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
                    <TableHead className="max-w-[380px]">Name</TableHead>
                    <TableHead className="w-[100px]">Project</TableHead>
                    <TableHead className="w-[340px]">Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((document, index) => {
                    const statusInfo = getStatusInfo(document.status as FileStatus);

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