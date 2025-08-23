// utils/statusHelper.ts
import { PROJECT_STATUS_ENUM } from "@/enums/project-status-enum";
import { XCircle, Clock, CheckCircle, HelpCircle } from "lucide-react";

const getStatusTranslation = (status: PROJECT_STATUS_ENUM): string => {
    switch (status) {
        case PROJECT_STATUS_ENUM.NOT_TRANSFERRED:
            return 'NO TRANSFERIDO';
        case PROJECT_STATUS_ENUM.IN_PROCESS:
            return 'EN PROCESO';
        case PROJECT_STATUS_ENUM.TRANSFERRED:
            return 'TRANSFERIDO';
        default:
            return 'ESTADO DESCONOCIDO';
    }
};

const getStatusStyle = (status: PROJECT_STATUS_ENUM): string => {
    switch (status) {
        case PROJECT_STATUS_ENUM.NOT_TRANSFERRED:
            return 'bg-red-100 text-red-800';
        case PROJECT_STATUS_ENUM.IN_PROCESS:
            return 'bg-yellow-100 text-yellow-800';
        case PROJECT_STATUS_ENUM.TRANSFERRED:
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getStatusIcon = (status: PROJECT_STATUS_ENUM) => {
    switch (status) {
        case PROJECT_STATUS_ENUM.NOT_TRANSFERRED:
            return XCircle;
        case PROJECT_STATUS_ENUM.IN_PROCESS:
            return Clock;
        case PROJECT_STATUS_ENUM.TRANSFERRED:
            return CheckCircle;
        default:
            return HelpCircle;
    }
};

const getStatusInfo = (status: PROJECT_STATUS_ENUM) => {
    const Icon = getStatusIcon(status);
    return {
        text: getStatusTranslation(status),
        className: getStatusStyle(status),
        icon: Icon
    };
};

export {
    PROJECT_STATUS_ENUM,
    getStatusTranslation,
    getStatusStyle,
    getStatusIcon,
    getStatusInfo
};