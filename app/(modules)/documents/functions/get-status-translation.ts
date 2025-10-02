
import { DocumentStatusEnum } from "@/enums/document-status-enum";
import { XCircle, Clock, CheckCircle, HelpCircle } from "lucide-react";

const getStatusTranslation = (status: DocumentStatusEnum): string => {
    switch(status) {
        case DocumentStatusEnum.NOT_TRANSFERRED:
            return 'NO TRANSFERIDO';
        case DocumentStatusEnum.IN_PROCESS:
            return 'EN PROCESO';
        case DocumentStatusEnum.TRANSFERRED:
            return 'TRANSFERIDO';
        default:
            return 'ESTADO DESCONOCIDO';
    }
};

const getStatusStyle = (status: DocumentStatusEnum): string => {
    switch (status){
        case DocumentStatusEnum.NOT_TRANSFERRED:
            return 'bg-red-100 text-red-800';
        case DocumentStatusEnum.IN_PROCESS:
            return 'bg-yellow-100 text-yellow-800';
        case DocumentStatusEnum.TRANSFERRED:
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusIcon = (status: DocumentStatusEnum) => {
    switch (status){
        case DocumentStatusEnum.NOT_TRANSFERRED:
            return XCircle;
        case DocumentStatusEnum.IN_PROCESS:
            return Clock;
        case DocumentStatusEnum.TRANSFERRED:
            return CheckCircle;
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