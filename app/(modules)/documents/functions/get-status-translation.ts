import {
    XCircle,
    Clock,
    HelpCircle,
    FileWarning,
    FileCheck,
    Layers,
    FileKey,
    Upload,
    ScanSearch,
    FileCog
} from "lucide-react";

import { FileStatus } from "@/enums/file-status";

const getStatusTranslation = (status: FileStatus): string => {
    switch (status) {
        case FileStatus.UNPROCESSED:
            return "NO PROCESADO";

        case FileStatus.SELECTED_FOR_TRANSFER:
            return "SELECCIONADO PARA TRANSFERENCIA";

        case FileStatus.NOT_SELECTED_FOR_TRANSFER:
            return "NO SELECCIONADO PARA TRANSFERENCIA";

        case FileStatus.SAVED_IN_MINIO:
            return "GUARDADO EN MINIO";

        case FileStatus.MATCH_RESULTS_READY:
            return "COINCIDENCIAS LISTAS";

        case FileStatus.WEIGHT_BELOW_THRESHOLD:
            return "PESO BAJO (REQUIERE KEYWORDS)";

        case FileStatus.TEXT_EXTRACTED:
            return "TEXTO EXTRAÍDO";

        case FileStatus.REQUIRES_HUMAN_REVIEW:
            return "REQUIERE REVISIÓN HUMANA";

        case FileStatus.NOT_CLASSIFIED:
            return "NO CLASIFICADO";

        case FileStatus.READY_FOR_RENAMING:
            return "LISTO PARA RENOMBRAR";

        case FileStatus.RENAMED:
            return "RENOMBRADO";

        case FileStatus.SAVED_IN_SHAREPOINT:
            return "GUARDADO EN SHAREPOINT";

        default:
            return "ESTADO DESCONOCIDO";
    }
};

const getStatusStyle = (status: FileStatus): string => {
    switch (status) {
        case FileStatus.UNPROCESSED:
        case FileStatus.NOT_SELECTED_FOR_TRANSFER:
        case FileStatus.WEIGHT_BELOW_THRESHOLD:
        case FileStatus.NOT_CLASSIFIED:
            return "bg-red-100 text-red-800";

        case FileStatus.REQUIRES_HUMAN_REVIEW:
            return "bg-orange-100 text-orange-800";

        case FileStatus.SELECTED_FOR_TRANSFER:
            return "bg-yellow-100 text-yellow-800";

        case FileStatus.MATCH_RESULTS_READY:
        case FileStatus.TEXT_EXTRACTED:
        case FileStatus.READY_FOR_RENAMING:
            return "bg-blue-100 text-blue-800";

        case FileStatus.SAVED_IN_MINIO:
        case FileStatus.RENAMED:
        case FileStatus.SAVED_IN_SHAREPOINT:
            return "bg-green-100 text-green-800";

        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getStatusIcon = (status: FileStatus) => {
    switch (status) {

        case FileStatus.UNPROCESSED:
        case FileStatus.NOT_SELECTED_FOR_TRANSFER:
            return XCircle;

        case FileStatus.SELECTED_FOR_TRANSFER:
            return Clock;

        case FileStatus.SAVED_IN_MINIO:
        case FileStatus.SAVED_IN_SHAREPOINT:
        case FileStatus.RENAMED:
            return Upload;

        case FileStatus.MATCH_RESULTS_READY:
            return FileCheck;

        case FileStatus.TEXT_EXTRACTED:
            return Layers;

        case FileStatus.WEIGHT_BELOW_THRESHOLD:
            return FileKey;

        case FileStatus.REQUIRES_HUMAN_REVIEW:
            return FileWarning;

        case FileStatus.NOT_CLASSIFIED:
            return ScanSearch;

        case FileStatus.READY_FOR_RENAMING:
            return FileCog;

        default:
            return HelpCircle;
    }
};

const getStatusInfo = (status: FileStatus) => {
    const Icon = getStatusIcon(status);
    return {
        text: getStatusTranslation(status),
        className: getStatusStyle(status),
        icon: Icon
    };
};

export {
    FileStatus,
    getStatusTranslation,
    getStatusStyle,
    getStatusIcon,
    getStatusInfo
};
