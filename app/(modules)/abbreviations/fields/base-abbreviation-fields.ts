import FormInputField from "@/components/form/form-input-field";
import SelectField from "@/components/form/select-field";
import { TypeOfAbbreviationList } from "@/functions/transform-enums";

export const BASE_ABBREVIATION_FIELDS = [
    {
        component: FormInputField,
        props: {
            name: "name",
            label: "Nombre",
            placeholder: "Ingresa el nombre",
            items: []
        },
    },
    {
        component: FormInputField,
        props: {
            name: "abbreviation",
            label: "Abreviación",
            placeholder: "Ingresa la abreviación",
            items: []
        },
    },
    {
        component: SelectField,
        props: {
            name: "type",
            label: "Tipo",
            placeholder: "Selecciona una opción",
            items: TypeOfAbbreviationList
        },
    },
];
