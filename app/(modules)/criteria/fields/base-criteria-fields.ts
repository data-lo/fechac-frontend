import DatePickerField from "@/components/form/date-picker-field";
import DynamicArrayField from "@/components/form/dynamic-array-field";
import InputField from "@/components/form/form-input-field";
import SelectField from "@/components/form/select-field";
import { DepartmentList, TypeOfFileList } from "@/functions/transform-enums";

// 1. Form Identification
export const FORM_IDENTIFICATION_FIELDS = [
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
            name: "issuing_organization",
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
        component: DatePickerField,
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
            name: "access_url",
            label: "URL de Accesso",
            placeholder: "Enter the access URL",
            items: []
        },
    },
    {
        component: SelectField,
        props: {
            name: "file_type",
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
            placeholder: "Agregar Sección",
            items: []
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "standard_fields",
            label: "Campos Estándar",
            placeholder: "Agregar Campos",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "visual_layout",
            label: "Layout",
            placeholder: "Agrega secciones",
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
            label: "Etiquetas Principales",
            placeholder: "Agregar Etiqueta",
            items: []
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "additional_keywords",
            label: "Palabras Clave Adicionales",
            placeholder: "Agregar Palabras Clave",
            items: []
        },
    },
];

// 6. Storage & Organization
export const STORAGE_FIELDS = [
    {
        component: InputField,
        props: {
            name: "destination_drive",
            label: "Destino Del Drive",
            placeholder: "Ingrese el destino",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "destination_path",
            label: "Destino del Path",
            placeholder: "Ingrese el path",
            items: []
        },
    },
    {
        component: SelectField,
        props: {
            name: "department",
            label: "Departamento de FECHAC",
            placeholder: "Seleccione un departamento",
            items: DepartmentList
        },
    },
];
