import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

interface Props {
    name: string;
    control: any;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    showLabel?: boolean;
}

const InputField = ({
    name,
    control,
    label,
    placeholder,
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
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default InputField ;