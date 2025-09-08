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
import useCreateRestriction from "../create/hooks/use-create-restriction";

// 4. Campos y esquemas locales
import BASE_RESTRICTION_FIELDS from "../fields/base-restrictions-fields";
import UPDATE_RESTRICTION_SCHEMA from "./schema/update-restriction-schema";
import { RestrictionDocument } from "../models/restriction-document";
import useUpdateRestriction from "./hooks/use-update-restriction";

interface Props {
    data: RestrictionDocument
}

const UpdateRestrictionForm = ({
    data
}: Props) => {
    const router = useRouter();

    const udpateMutation = useUpdateRestriction();

    const schema = UPDATE_RESTRICTION_SCHEMA;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            character: data.character,
            _id: data._id.toString()
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        udpateMutation.mutate({ _id: values._id.toString(), character: values.character }, {
            onSuccess: (data) => {
                if (data.success) {
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
                    <ActionButton
                        type="submit"
                        className="w-full"
                        iconName={"Save"}
                        title="Actualizar Información"
                        isPending={udpateMutation.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default UpdateRestrictionForm;
