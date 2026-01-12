import { Department } from "@/enums/department";
import { Periodicity } from "@/enums/periodicity";
import { TypeOfFile } from "@/enums/type-of-file";
import { DestinationPath } from "@/enums/destination-path";
import { TypeOfAbbreviation } from "@/enums/type-of-abbreviation";

export const TypeOfFileList = Object.values(TypeOfFile).map(value => ({
    value,
    label: value
}));

export const DestinationPathList = Object.values(DestinationPath).map(value => ({
    value,
    label: value
}));

export const PeriodicityList = Object.values(Periodicity).map(value => ({
    value,
    label: value
}));

export const DepartmentList = Object.values(Department).map(value => ({
    value,
    label: value
}));

export const TypeOfAbbreviationList = Object.values(TypeOfAbbreviation).map(value => ({
    value,
    label: value
}));

