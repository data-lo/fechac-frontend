export interface FieldProps {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    items?: Array<{ label: string; value: any }>;
    [key: string]: any;
}

export interface FormField {
    key: string;
    component: React.ComponentType<any>;
    props: FieldProps;
}

export type FieldOverride = {
    props?: Partial<FieldProps>;
};

export type FieldOverridesMap = Record<string, FieldOverride>;

export default function applyFormOverrides(
    fields: FormField[],
    overrides: FieldOverridesMap
): FormField[] {
    return fields.map((field) => {
        const override = overrides[field.key];

        if (!override) return field;

        return {
            ...field,
            props: {
                ...field.props,
                ...override.props,
            }
        };
    });
}
