import DynamicArrayField from "@/components/form/dynamic-array-field";
import InputField from "@/components/form/input-field";
import MultipleSelectComponent from "@/components/form/multiple-select-field";
import SelectField from "@/components/form/select-field";
import { DepartmentList } from "@/functions/transform-enums";
import { TARGET_DRIVES_LIST } from "../utils/target_drives-list";

// 1. Identification
export const CRITERIA_IDENTIFICATION_FIELDS = [
    {
        component: InputField,
        props: {
            name: "file_name",
            label: "Nombre del Archivo",
            placeholder: "Ingresa el nombre del archivo",
            items: [],
        },
    },
    {
        component: InputField,
        props: {
            name: "quality_system_code",
            label: "Código del Sistema de Calidad",
            placeholder: "Ingresa el código",
            items: [],
        },
    },
    {
        component: SelectField,
        props: {
            name: "department",
            label: "Departamento",
            placeholder: "Seleccione un departamento",
            items: DepartmentList,
        },
    },
];

// 2. Classification
export const CRITERIA_CLASSIFICATION_FIELDS = [
    {
        component: DynamicArrayField,
        props: {
            name: "primary_keywords",
            label: "Palabras Clave Primarias",
            placeholder: "Agregar palabra",
            items: [],
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "secundary_keywords",
            label: "Palabras Clave Secundarias",
            placeholder: "Agregar palabra",
            items: [],
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "domain_tags",
            label: "Etiquetas de Dominio",
            placeholder: "Agregar etiqueta",
            items: [],
        },
    },
    {
        component: DynamicArrayField,
        props: {
            name: "name_variants",
            label: "Variantes de Nombre",
            placeholder: "Agregar variante",
            items: [],
        },
    },
];

// 3. Storage
export const CRITERIA_STORAGE_FIELDS = [
    {
        component:  MultipleSelectComponent,
        props: {
            name: "target_drives",
            label: "Drive Destino",
            placeholder: "Selecciona una opción",
            items: TARGET_DRIVES_LIST,
        },
    },
    {
        component: InputField,
        props: {
            name: "target_path",
            label: "Ruta de Destino",
            placeholder: "Ejemplo: /cotizaciones",
            items: [],
        },
    },
];

// 4. Project
export const CRITERIA_PROJECT_FIELDS = [
    {
        component: InputField,
        props: {
            name: "project_focus",
            label: "Enfoque del Proyecto",
            items: [],
        },
    },
    {
        component: InputField,
        props: {
            name: "project_area",
            label: "Área del Proyecto",
            items: [],
        },
    },
    {
        component: InputField,
        props: {
            name: "project_type",
            label: "Tipo de Proyecto",
            items: [],
        },
    },
    {
        component: InputField,
        props: {
            name: "version",
            label: "Versión",
            items: [],
        },
    },
];
