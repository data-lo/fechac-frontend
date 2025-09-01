import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface Props {
    nameField: string
    formControl: any
    title: string
    placeholder: string
    disabled?: boolean;
    isTitleRequired?: boolean;
    items: {
        label: string;
        value: string
    }[]
}
const SelectComponent = ({
    nameField,
    formControl,
    title,
    placeholder,
    items,
    disabled = false,
    isTitleRequired = true
}: Props) => {
    return (
        <div className="rounded-md flex p-1 flex-col space-y-4">
            {isTitleRequired && (
                <p className="font-normal text-sm">{title}</p>
            )}

            <FormField
                control={formControl}
                name={nameField}
                render={({ field }) => {
                    const selectedLabel = items.find(item => item.value === field.value)?.label || placeholder;
                    return (
                        <FormItem>
                            <FormControl>
                                <Select
                                    disabled={disabled}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder}>
                                            {selectedLabel}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {items.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {isTitleRequired && (
                                <FormMessage />
                            )}
                        </FormItem>
                    );
                }}
            />
        </div>
    );
};

export default SelectComponent;