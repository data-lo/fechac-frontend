import DynamicArrayField from "@/components/form/dynamic-array-field";
import InputField from "@/components/form/form-input-field";

const CRITERION_FORM_FIELDS = [
    {
        component: InputField,
        props: {
            name: "file_name",
            label: "Nombre del Archivo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "form_code",
            label: "Código de Identificación",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "form_title",
            label: "Titulo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "issuer",
            label: "Entidad Emisora",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "url_patter",
            label: "URL",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "destiny_drive",
            label: "Repositorio de Destino",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "organization_department",
            label: "Área",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "destiny_path",
            label: "Ruta de Destino",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "mimetype",
            label: "Tipo de Archivo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
     {
        component: DynamicArrayField,
        props: {
            name: "main_sections",
            label: "Tipo de Archivo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },

];

export default CRITERION_FORM_FIELDS;