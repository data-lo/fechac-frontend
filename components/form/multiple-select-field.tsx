import { Control } from "react-hook-form";
import { MultiSelect } from "../ui/multiple-select"
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form"

interface Props {
    name: string
    control: Control<any>
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

const MultipleSelectComponent = ({
    name,
    control,
    label,
    placeholder,
    items,
    disabled = false
}: Props) => {
    return (
        <div className="rounded-md flex p-1 flex-col space-y-4">
            <p className="text-sm">{label}</p>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <MultiSelect
                                disabled={disabled}
                                options={items}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                placeholder={placeholder}
                                variant="secondary"
                                animation={2}
                                maxCount={3}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

    );
}

export default MultipleSelectComponent;