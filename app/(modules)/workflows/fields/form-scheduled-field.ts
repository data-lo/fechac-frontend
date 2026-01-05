import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";

export const FORM_SHEDULE_FIELDS = [
    {
        key: "periodicity",
        component: InputField,
        props: {
            name: "periodicity",
            label: "Periodicidad",
            placeholder: "Selecciona una opción",
            items: []
        },
    },
];
