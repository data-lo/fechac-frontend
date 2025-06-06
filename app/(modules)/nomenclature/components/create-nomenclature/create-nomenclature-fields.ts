import { InputForm } from "@/components/form/input";

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
