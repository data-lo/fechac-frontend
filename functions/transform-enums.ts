import { DestinationPathEnum } from "@/enums/destination-path";
import { TypeOfFileEnum } from "@/enums/type-of-file-enum";

export const TypeOfFileList = Object.values(TypeOfFileEnum).map(value => ({
    value,
    label: value
}));

export const DestinationPathList = Object.values(DestinationPathEnum).map(value => ({
    value,
    label: value
}));
