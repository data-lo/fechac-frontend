import SelectField from "@/components/form/select-field";
import { PeriodicityList } from "@/functions/transform-enums";

export const FORM_SHEDULE_FIELDS = [
    {
        key: "periodicity",
        component: SelectField,
        props: {
            name: "periodicity",
            label: "Periodicidad",
            placeholder: "Selecciona una opción",
            items: PeriodicityList
        },
    },
];
