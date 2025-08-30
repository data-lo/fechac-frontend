import FormInputField from "@/components/form/form-input-field";


export const CREATE_NOMENCLATURE_FIELDS = [
    {
        component: FormInputField,
        props: {
            name: "character",
            label: "Carácter",
            placeholder: "Ingresa el carácter restringido",
            items: []
        },
    },
];
