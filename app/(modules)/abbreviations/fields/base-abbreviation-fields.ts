
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import { TypeOfAbbreviationList } from "@/functions/transform-enums";
import { BASE_ABBREVIATION_SCHEMA } from "../schema/base- abbreviation-schema";
import * as z from "zod";

export const BASE_ABBREVIATION_FIELDS = [
    {
        component: InputField,
        props: {
            name: "name" as keyof z.infer<typeof BASE_ABBREVIATION_SCHEMA>,
            label: "Nombre",
            placeholder: "Ingresa el nombre",
            items: []
        },
    },
    {
        component: InputField,
        props: {
            name: "abbreviation" as keyof z.infer<typeof BASE_ABBREVIATION_SCHEMA>,
            label: "Abreviación",
            placeholder: "Ingresa la abreviación",
            items: []
        },
    },
    {
        component: SelectField,
        props: {
            name: "type" as keyof z.infer<typeof BASE_ABBREVIATION_SCHEMA>,
            label: "Tipo",
            placeholder: "Selecciona una opción",
            items: TypeOfAbbreviationList
        },
    },
];
