"use client";

// 1. External libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// 2. UI components (global)
import { Form } from "@/components/ui/form";
import CommandButton from "@/components/button/command-button";

// 3. Local hooks
import useUpdateRestriction from "./hooks/use-update-restriction";

// 4. Local fields & schemas
import BASE_RESTRICTION_FIELDS from "../fields/base-restrictions-fields";
import UPDATE_RESTRICTION_SCHEMA from "./schema/update-restriction-schema";

// 5. Domain models
import RestrictionDocument from "@/models/restrictions/restriction-document";

interface Props {
    data: RestrictionDocument
}

const UpdateRestrictionForm = ({
    data
}: Props) => {
    const router = useRouter();

    const updateRestriction = useUpdateRestriction();

    const form = useForm<z.infer<typeof UPDATE_RESTRICTION_SCHEMA>>({
        resolver: zodResolver(UPDATE_RESTRICTION_SCHEMA),
        defaultValues: {
            character: data.character,
            _id: data._id.toString()
        },
    });

    const onSubmit = async (values: z.infer<typeof UPDATE_RESTRICTION_SCHEMA>) => {
        updateRestriction.mutate({ _id: values._id.toString(), character: values.character }, {
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
                    <CommandButton
                        icon="Save"
                        width="min"
                        isLoading={updateRestriction.isPending}
                    >
                        Actualizar
                    </CommandButton>
                </div>
            </form>
        </Form>
    );
};

export default UpdateRestrictionForm;
