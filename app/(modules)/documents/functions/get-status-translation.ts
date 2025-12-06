import { DocumentStatusEnum } from "@/enums/document-status-enum";
import { 
    XCircle, 
    Clock, 
    CheckCircle, 
    HelpCircle,
    FileWarning,
    FileCheck,
    Layers,
    FileKey,
    Upload,
    ScanSearch,
    Search,
    FileCog
} from "lucide-react";

const getStatusTranslation = (status: DocumentStatusEnum): string => {
    switch(status) {
        case DocumentStatusEnum.UNPROCESSED:
            return "NO PROCESADO";

        case DocumentStatusEnum.SELECTED_FOR_TRANSFER:
            return "SELECCIONADO PARA TRANSFERENCIA";

        case DocumentStatusEnum.NOT_SELECTED_FOR_TRANSFER:
            return "NO SELECCIONADO PARA TRANSFERENCIA";

        case DocumentStatusEnum.SAVED_IN_MINIO:
            return "GUARDADO EN MINIO";

        case DocumentStatusEnum.MATCH_RESULTS_READY:
            return "COINCIDENCIAS LISTAS";

        case DocumentStatusEnum.WEIGHT_BELOW_THRESHOLD:
            return "PESO BAJO (REQUIERE KEYWORDS)";

        case DocumentStatusEnum.TEXT_EXTRACTED:
            return "TEXTO EXTRAÍDO";

        case DocumentStatusEnum.REQUIRES_HUMAN_REVIEW:
            return "REQUIERE REVISIÓN HUMANA";

        case DocumentStatusEnum.NOT_CLASSIFIED:
            return "NO CLASIFICADO";

        case DocumentStatusEnum.READY_FOR_RENAMING:
            return "LISTO PARA RENOMBRAR";

        case DocumentStatusEnum.RENAMED:
            return "RENOMBRADO";

        case DocumentStatusEnum.SAVED_IN_SHAREPOINT:
            return "GUARDADO EN SHAREPOINT";

        default:
            return "ESTADO DESCONOCIDO";
    }
};

const getStatusStyle = (status: DocumentStatusEnum): string => {
    switch (status){
        case DocumentStatusEnum.UNPROCESSED:
        case DocumentStatusEnum.NOT_SELECTED_FOR_TRANSFER:
        case DocumentStatusEnum.WEIGHT_BELOW_THRESHOLD:
        case DocumentStatusEnum.NOT_CLASSIFIED:
            return "bg-red-100 text-red-800";

        case DocumentStatusEnum.REQUIRES_HUMAN_REVIEW:
            return "bg-orange-100 text-orange-800";

        case DocumentStatusEnum.SELECTED_FOR_TRANSFER:
            return "bg-yellow-100 text-yellow-800";

        case DocumentStatusEnum.MATCH_RESULTS_READY:
        case DocumentStatusEnum.TEXT_EXTRACTED:
        case DocumentStatusEnum.READY_FOR_RENAMING:
            return "bg-blue-100 text-blue-800";

        case DocumentStatusEnum.SAVED_IN_MINIO:
        case DocumentStatusEnum.RENAMED:
        case DocumentStatusEnum.SAVED_IN_SHAREPOINT:
            return "bg-green-100 text-green-800";

        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getStatusIcon = (status: DocumentStatusEnum) => {
    switch (status){

        case DocumentStatusEnum.UNPROCESSED:
        case DocumentStatusEnum.NOT_SELECTED_FOR_TRANSFER:
            return XCircle;

        case DocumentStatusEnum.SELECTED_FOR_TRANSFER:
            return Clock;

        case DocumentStatusEnum.SAVED_IN_MINIO:
        case DocumentStatusEnum.SAVED_IN_SHAREPOINT:
        case DocumentStatusEnum.RENAMED:
            return Upload;

        case DocumentStatusEnum.MATCH_RESULTS_READY:
            return FileCheck;

        case DocumentStatusEnum.TEXT_EXTRACTED:
            return Layers;

        case DocumentStatusEnum.WEIGHT_BELOW_THRESHOLD:
            return FileKey;

        case DocumentStatusEnum.REQUIRES_HUMAN_REVIEW:
            return FileWarning;

        case DocumentStatusEnum.NOT_CLASSIFIED:
            return ScanSearch;

        case DocumentStatusEnum.READY_FOR_RENAMING:
            return FileCog;

        default:
            return HelpCircle;
    }
};

const getStatusInfo = (status: DocumentStatusEnum) => {
    const Icon = getStatusIcon(status);
    return {
        text: getStatusTranslation(status),
        className: getStatusStyle(status),
        icon: Icon
    };
};

export {
    DocumentStatusEnum,
    getStatusTranslation,
    getStatusStyle,
    getStatusIcon,
    getStatusInfo
};
