import { ProjectStatus } from "@/enums/project-status";

import { XCircle, Clock, CheckCircle, HelpCircle } from "lucide-react";

const getStatusTranslation = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.UNPROCESSED:
            return 'NO PROCESADO';
        case ProjectStatus.SELECTED_FOR_TRANSFER:
            return 'A TRANSFERIR';
        case ProjectStatus.NOT_SELECT_TO_TRANSFER:
            return 'NO SELECCIONADO PARA TRANSFERIR';
        case ProjectStatus.TRANSFERRED:
            return 'TRANSFERIDO';
        default:
            return 'ESTADO DESCONOCIDO';
    }
};

const getStatusStyle = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.UNPROCESSED:
            return 'bg-red-100 text-red-800';
        case ProjectStatus.SELECTED_FOR_TRANSFER:
            return 'bg-yellow-100 text-yellow-800';
        case ProjectStatus.NOT_SELECT_TO_TRANSFER:
            return 'bg-green-100 text-green-800';
        case ProjectStatus.TRANSFERRED:
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
        case ProjectStatus.UNPROCESSED:
            return XCircle;
        case ProjectStatus.SELECTED_FOR_TRANSFER:
            return Clock;
        case ProjectStatus.NOT_SELECT_TO_TRANSFER:
            return CheckCircle;
        case ProjectStatus.TRANSFERRED:
            return CheckCircle;
        default:
            return HelpCircle;
    }
};

const getStatusInfo = (status: ProjectStatus) => {
    const Icon = getStatusIcon(status);
    return {
        text: getStatusTranslation(status),
        className: getStatusStyle(status),
        icon: Icon
    };
};

export {
    ProjectStatus,
    getStatusTranslation,
    getStatusStyle,
    getStatusIcon,
    getStatusInfo
};