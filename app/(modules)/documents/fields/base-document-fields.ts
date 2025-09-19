import DatePickerField from "@/components/form/date-picker-field";
import DynamicArrayField from "@/components/form/dynamic-array-field";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import { DepartmentList, TypeOfFileList } from "@/functions/transform-enums";
import { Component } from "lucide-react";


// 1. Identification
export const FORM_IDENTIFICATION_FIELDS = [
    {
        component: InputField,
        props: {
            name: "uuid",
            label: "uuid",
            placeholder: "Ingresa el uuid",
            disabled: true,
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "project_id",
            label: "ID del proyecto",
            placeholder: "Ingresa el ID del proyecto",
            items: []
        },
    },
]

// 2. Access
export const FORM_ACCESS_FIELDS = [
    {
        component: InputField,
        props: {
            name: "path",
            label: "Ruta (path)",
            placeholder: "/RUTA/DEL/PROYECTO",
            items: [],
        },
    },
    {
        component: InputField,
        props: {
            name: "download_url",
            label: "URL de descarga",
            placeholder: "https://...",
            items: []
        }
    }
];

// 3. Classification
export const FORM_CLASSIFICATION_FIELDS = [
    {
        component: SelectField,
        props: {
            name: "area",
            label: "Área",
            placeholder: "selecciona el área",
            items: DepartmentList
        },
    },
    {
        component: SelectField,
        props: {
            name: "is_multimedia",
            label: "¿Es multimedia?",
            placeholder: "Selecciona una opción",
            items: [
                { label: "Sí", value: "true" },
                { label: "No", value: "false" },
            ],
        },
    },
];


// 4. Linkage (enlaces externos/IDs)
export const FORM_LINKAGE_FIELDS = [
    {
        component: InputField,
        props: {
            name: "item_id",
            label: "Item ID",
            placeholder: "Ingresa el Item ID",
            items: [],
        },
    },
];

// 5. Status
export const FORM_STATUS_FIELDS = [
    {component: SelectField,
        props: {
            name: "status",
            label: "Estatus de transferencia",
            placeholder: "Selecciona el estatus",
            items: [
                { label: "No transferido", value: "NOT_TRANSFERRED" },
                { label: "transferido", value: "TRANSFERRED" },
                { label: "En progreso", value: "IN_PROGRESS"},
            ],
        },
    },
];

// 6. metadata
export const FORM_METADATA_FIELDS = [
    {
        component: InputField,
        props: {
            name: "metadata_readonly",
            label: "Metadata",
            placeholder: "solo lectura",
            disabled: true,
        }
    }
]