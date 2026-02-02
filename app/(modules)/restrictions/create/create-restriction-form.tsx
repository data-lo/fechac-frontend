"use client"
// 1. Librerías externas
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// 2. Componentes globales
import { Form } from "@/components/ui/form";
import CommandButton from "@/components/button/command-button";

// 3. Hooks locales
import useCreateRestriction from "./hooks/use-create-restriction";

// 4. Campos y esquemas locales
import BASE_RESTRICTION_FIELDS from "../fields/base-restrictions-fields";
import BASE_RESTRICTION_SCHEMA from "../schema/base-restriction-schema";


const UpdateNomenclatureForm = () => {
    const router = useRouter();

    const createRestriction = useCreateRestriction();

    const schema = BASE_RESTRICTION_SCHEMA;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            character: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        createRestriction.mutate(values, {
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
                {BASE_RESTRICTION_FIELDS.map
                    (({ component: Component, props }, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}

                <div className="flex justify-end">
                    <CommandButton
                        icon="Save"
                        width="min"
                        isLoading={createRestriction.isPending}
                    >
                        Guardar
                    </CommandButton>
                </div>
            </form>
        </Form>
    );
};

export default UpdateNomenclatureForm;
