import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

interface Props {
    nameField: string;
    formControl: any;
    title: string;
    placeholder?: string;
    disabled?: boolean;
    isTitleRequired?: boolean;

}

const InputForm = ({
    nameField,
    formControl,
    title,
    placeholder,
    disabled = false,
    isTitleRequired = true
}: Props) => {


    return (
        <div className="p-1 rounded-md flex flex-col gap-4">
            {isTitleRequired && (<p className="font-normal text-sm">{title}</p>)}
            <FormField
                control={formControl}
                name={nameField}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field}
                            />
                        </FormControl>
                        {isTitleRequired && (<FormMessage />)}
                    </FormItem>
                )}
            />
        </div>
    );

}

export { InputForm };