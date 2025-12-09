// utils/statusHelper.ts
import { ProjectStatusEnum } from "@/enums/project-status-enum";
import { XCircle, Clock, CheckCircle, HelpCircle } from "lucide-react";

const getStatusTranslation = (status: ProjectStatusEnum): string => {
    switch (status) {
        case ProjectStatusEnum.UNPROCESSED:
            return 'NO PROCESADO';
        case ProjectStatusEnum.SELECTED_FOR_TRANSFER:
            return 'A TRANSFERIR';
        case ProjectStatusEnum.NOT_SELECT_TO_TRANSFER:
            return 'NO SELECCIONADO PARA TRANSFERIR';
        case ProjectStatusEnum.TRANSFERRED:
            return 'TRANSFERIDO';
        default:
            return 'ESTADO DESCONOCIDO';
    }
};

const getStatusStyle = (status: ProjectStatusEnum): string => {
    switch (status) {
        case ProjectStatusEnum.UNPROCESSED:
            return 'bg-red-100 text-red-800';
        case ProjectStatusEnum.SELECTED_FOR_TRANSFER:
            return 'bg-yellow-100 text-yellow-800';
        case ProjectStatusEnum.NOT_SELECT_TO_TRANSFER:
            return 'bg-green-100 text-green-800';
        case ProjectStatusEnum.TRANSFERRED:
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusIcon = (status: ProjectStatusEnum) => {
    switch (status) {
        case ProjectStatusEnum.UNPROCESSED:
            return XCircle;
        case ProjectStatusEnum.SELECTED_FOR_TRANSFER:
            return Clock;
        case ProjectStatusEnum.NOT_SELECT_TO_TRANSFER:
            return CheckCircle;
        case ProjectStatusEnum.TRANSFERRED:
            return CheckCircle;
        default:
            return HelpCircle;
    }
};

const getStatusInfo = (status: ProjectStatusEnum) => {
    const Icon = getStatusIcon(status);
    return {
        text: getStatusTranslation(status),
        className: getStatusStyle(status),
        icon: Icon
    };
};

export {
    ProjectStatusEnum,
    getStatusTranslation,
    getStatusStyle,
    getStatusIcon,
    getStatusInfo
};