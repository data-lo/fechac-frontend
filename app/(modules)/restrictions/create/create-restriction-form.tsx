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
import { useCreateRestriction } from "./hooks/use-create-restriction";

// 4. Campos y esquemas locales
import { BASE_NOMENCLATURE_FIELDS } from "./fields/base-nomenclature-fields";
import { BASE_NOMENCLATURE_SCHEMA } from "./schema/base-restriction-schema";

const CreateNomenclatureForm = () => {

    const router = useRouter();

    const createMutation = useCreateRestriction();

    const schema = BASE_NOMENCLATURE_SCHEMA;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            character: "",
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
                {BASE_NOMENCLATURE_FIELDS.map
                    (({ component: Component, props }, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}

                <div className="flex justify-end">
                    <ActionButton
                        type="submit"
                        iconName={"Save"}
                        title="Guardar Información"
                        isPending={createMutation.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default CreateNomenclatureForm;
