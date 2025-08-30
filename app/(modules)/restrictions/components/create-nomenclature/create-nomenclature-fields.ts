import { InputForm } from "@/components/form/form-input-field";

export const CREATE_NOMENCLATURE_FIELDS = [
    {
        component: InputForm,
        props: {
            nameField: "character",
            title: "Carácter",
            placeholder: "Ingresa el carácter restringido",
            items: []
        },
    },
];
