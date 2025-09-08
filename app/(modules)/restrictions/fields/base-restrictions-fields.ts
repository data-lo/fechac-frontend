import FormInputField from "@/components/form/form-input-field";


const BASE_RESTRICTION_FIELDS = [
    {
        component: FormInputField,
        props: {
            name: "character",
            label: "Carácter",
            placeholder: "Ingresa el carácter restrictivo",
            items: []
        },
    },
];

export default BASE_RESTRICTION_FIELDS;