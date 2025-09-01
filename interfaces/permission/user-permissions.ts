export interface UserPermissions {
    canEditBasicInfo: boolean;
    canEditVersioning: boolean;
    canEditAccess: boolean;
    canEditClassification: boolean;
    canEditStorage: boolean;
    isAdministrator: boolean;
    department: string;
}