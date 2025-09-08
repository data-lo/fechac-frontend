"use client"
// 1. Librerías externas
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// 2. Componentes globales
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// 3. Hooks locales
import { useCreateAbbreviation } from "./hooks/use-create-abbreviations";

// 4. Campos y esquemas locales
import { BASE_ABBREVIATION_SCHEMA } from "../schema/base- abbreviation-schema";
import { BASE_ABBREVIATION_FIELDS } from "../fields/base-abbreviation-fields";

const CreateAbbreviationForm = () => {

    const router = useRouter();

    const createMutation = useCreateAbbreviation();

    const schema = BASE_ABBREVIATION_SCHEMA;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            abbreviation: "",
            type: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        createMutation.mutate(values, {
            onSuccess: (data) => {
                if (data.success) {
                    form.reset()
                    router.refresh()
                }
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                {BASE_ABBREVIATION_FIELDS.map
                    (({ component: Component, props }, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}

                <div className="flex justify-end">
                    <ActionButton
                        type="submit"
                        className="w-full"
                        iconName={"Save"}
                        title="Guardar Información"
                        isPending={createMutation.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default CreateAbbreviationForm;
