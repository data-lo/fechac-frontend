import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import { DepartmentList} from "@/functions/transform-enums";

export const FORM_IDENTIFICATION_FIELDS = [
    {
        component: InputField,
        props: {
            name: "uuid",
            label: "PROYECTO ID",
            placeholder: "Ingresa el número de proyecto",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "project_id",
            label: "ESTATUS",
            placeholder: "Selecciona una opción",
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
            disabled: true,
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
            disabled: true,
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
            label: "Estatus de Transferencia",
            placeholder: "Selecciona el estatus",
            items: [
                { label: "No transferido", value: "NO_TRANSFERED" },
                { label: "transferido", value: "TRANSFERED" },
                { label: "En progreso", value: "IN_PROCESS"},
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