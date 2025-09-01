import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { MultiSelect } from "../ui/multiple-select"

interface MultiSelectOption {
    label: string;
    value: string;
}

interface MultipleSelectComponentProps {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    options: MultiSelectOption[];
    disabled?: boolean;
    showLabel?: boolean;
    variant?: "default" | "secondary" | "destructive" | "outline";
    animation?: number;
    maxCount?: number;
}

const MultipleSelectComponent = ({
    control,
    name,
    label,
    placeholder = "Seleccionar opciones",
    options,
    disabled = false,
    showLabel = true,
    variant = "secondary",
    animation = 2,
    maxCount = 3
}: MultipleSelectComponentProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="p-1 rounded-md flex flex-col gap-4">
                    {showLabel && (
                        <label className="font-normal text-sm" htmlFor={name}>
                            {label}
                        </label>
                    )}
                    
                    <FormItem>
                        <FormControl>
                            <MultiSelect
                                disabled={disabled}
                                options={options}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                placeholder={placeholder}
                                variant={variant}
                                animation={animation}
                                maxCount={maxCount}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
            )}
        />
    );
};

export default MultipleSelectComponent;