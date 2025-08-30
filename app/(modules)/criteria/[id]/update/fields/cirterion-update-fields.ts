import FormInputField from "@/components/form/form-input-field";

const CRITERION_FORM_FIELDS = [
    {
        component: FormInputField,
        props: {
            name: "file_name",
            label: "Nombre del Archivo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "form_code",
            label: "Código de Identificación",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "form_title",
            label: "Titulo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "issuer",
            label: "Entidad Emisora",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "url_patter",
            label: "URL",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "destiny_drive",
            label: "Repositorio de Destino",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "organization_department",
            label: "Área",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "destiny_path",
            label: "Ruta de Destino",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "mimetype",
            label: "Tipo de Archivo",
            placeholder: "Introduce el nombre del archivo",
            items: []
        },
    },

];

export default CRITERION_FORM_FIELDS;