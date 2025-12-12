import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";

export const FORM_IDENTIFICATION_FIELDS = [
    {
        key: "sadap_id",
        component: InputField,
        props: {
            name: "sadap_id",
            label: "PROYECTO ID",
            placeholder: "Ingresa el número de proyecto",
            items: []
        },
    },
    {
        key: "selected_criterion_id",
        component: SelectField,
        props: {
            name: "selected_criterion_id",
            label: "CRITERIO",
            placeholder: "Selecciona un criterio",
            items: []
        },
    },
];
