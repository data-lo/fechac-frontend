import { DepartmentEnum } from "@/enums/department-enum";
import { DestinationPathEnum } from "@/enums/destination-path-enum";
import { TypeOfAbbreviationEnum } from "@/enums/type-of-abbreviation-enum";
import { TypeOfFileEnum } from "@/enums/type-of-file-enum";

export const TypeOfFileList = Object.values(TypeOfFileEnum).map(value => ({
    value,
    label: value
}));

export const DestinationPathList = Object.values(DestinationPathEnum).map(value => ({
    value,
    label: value
}));

export const DepartmentList = Object.values(DepartmentEnum).map(value => ({
    value,
    label: value
}));

export const TypeOfAbbreviationList = Object.values(TypeOfAbbreviationEnum).map(value => ({
    value,
    label: value
}));

