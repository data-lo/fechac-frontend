import DynamicArrayField from "@/components/form/dynamic-array-field";
import InputField from "@/components/form/form-input-field";
import { TypeOfFileList } from "@/functions/transform-enums";

// 1. Form Identification
export const FORM_IDENTIFICATION_FIELDS = [
    {
        component: InputField,
        props: {
            name: "file_name",
            label: "Nombre del Archivo",
            placeholder: "Ingresa el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "form_code",
            label: "Código",
            placeholder: "Ingresa el código",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "form_title",
            label: "Título",
            placeholder: "Ingresa el título",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "issuer",
            label: "Organización",
            placeholder: "Ingresa la organización",
            items: []
        },
    },
];

// 2. Version Control
export const VERSION_CONTROL_FIELDS = [
    {
        component: InputField,
        props: {
            name: "revision_number",
            label: "Número de Revisión",
            placeholder: "Ingrese el número de revisión",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "revision_date",
            label: "Última Fecha de Revisión",
            placeholder: "Seleccione una fecha",
            items: []
        },
    },
];

// 3. Access & Publishing
export const ACCESS_FIELDS = [
    {
        component: InputField,
        props: {
            name: "url_pattern",
            label: "URL de Accesso",
            placeholder: "Enter the access URL",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "mimetype",
            label: "Tipo de Archivo",
            placeholder: "Selecciona una opción",
            items: TypeOfFileList
        },
    },
];

// 4. Content Structure
export const CONTENT_FIELDS = [
    {
        component: DynamicArrayField,
        props: {
            name: "main_sections",
            label: "Secciones del Documento",
            placeholder: "Add a section",
            items: []
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "canonical_fields",
            label: "Canonical Fields",
            placeholder: "Add a field",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "visual_layout",
            label: "Visual Layout",
            placeholder: "Define the visual layout",
            items: []
        },
    },
];

// 5. Classification & Search
export const CLASSIFICATION_FIELDS = [
    {

        component: DynamicArrayField,
        props: {
            name: "domain_tags",
            label: "Domain Tags",
            placeholder: "Add a tag",
            items: []
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "additional_keywords",
            label: "Additional Keywords",
            placeholder: "Add a keyword",
            items: []
        },
    },
];

// 6. Storage & Organization
export const STORAGE_FIELDS = [
    {
        component: InputField,
        props: {
            name: "destiny_drive",
            label: "Destination Drive",
            placeholder: "Enter the destination drive",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "destiny_path",
            label: "Destination Path",
            placeholder: "Enter the destination path",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "organization_department",
            label: "Responsible Department",
            placeholder: "Enter the responsible department",
            items: []
        },
    },
];
