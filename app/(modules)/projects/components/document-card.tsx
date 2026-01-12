'use client'

import { useRouter } from "next/navigation";
import { AlertTriangle, FileText, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    FileStatus,
    getStatusInfo,
} from "../../documents/functions/get-status-translation";
import FileDocument from "@/models/files/file-document";

interface Props {
    document: FileDocument;
}

const STATUS_REQUIERE_REVISION: FileStatus[] = [
    FileStatus.REQUIRES_HUMAN_REVIEW,
    FileStatus.NOT_CLASSIFIED,
    FileStatus.WEIGHT_BELOW_THRESHOLD,
];

export default function DocumentCard({ document }: Props) {
    const router = useRouter();

    const statusInfo = getStatusInfo(document.status as FileStatus);
    const StatusIcon = statusInfo.icon;
    const requiresRevision = STATUS_REQUIERE_REVISION.includes(document.status as FileStatus);

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/documents/update/${encodeURIComponent(String(document._id))}`);
    };

    return (
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                    {/* Icon & Name */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <FileText size={24} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                                    {String(document.file_name)
                                        .replace(/\.[^/.]+$/, "")
                                        .toUpperCase()}
                                </h3>
                                {requiresRevision && (
                                    <div title="Requiere Revisión">
                                        <AlertTriangle size={18} className="text-yellow-500" />
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="font-medium">Departamento:</span> {document.department}
                            </p>
                        </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium ${statusInfo.className}`}>
                            <StatusIcon size={14} />
                            {statusInfo.text}
                        </div>

                        <Button onClick={handleEdit} variant="outline" size="sm" className="gap-2">
                            Ver Detalles
                            <ArrowRight size={14} />
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
