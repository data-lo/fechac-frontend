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
    name: string
    control: any
    label: string
    placeholder: string
    disabled?: boolean;
    isTitleRequired?: boolean;
    items: {
        label: string;
        value: string
    }[],
    showLabel?: boolean;
}
const SelectField = ({
    name,
    control,
    label,
    placeholder,
    items,
    disabled = false,
    showLabel = true
}: Props) => {
    return (
        <div className="p-1 rounded-md flex flex-col gap-4">
            {showLabel && (
                <label className="font-normal text-sm" htmlFor={name}>
                    {label}
                </label>
            )}

            <FormField
                control={control}
                name={name}
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
                            <FormMessage />

                        </FormItem>
                    );
                }}
            />
        </div>
    );
};

export default SelectField;