export interface FieldStructure {
    key: string;
    component: React.ComponentType<any>;
    props: {
        name: string;
        label: string;
        placeholder?: string;
        items?: any[];
    };
}
