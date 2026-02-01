"use client";

// 1. External libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// 2. UI components
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// 3. Local hooks
import useUpdateAbbreviation from "./hooks/use-update-abbreviation";

// 4. Domain models
import AbbreviationDocument from "../models/abbreviation-document";

// 5. Form fields & schemas
import UPDATE_ABBREVIATION_SCHEMA from "./schema/update-abbreviation-schema";
import { BASE_ABBREVIATION_FIELDS } from "../fields/base-abbreviation-fields";
interface Props {
    data: AbbreviationDocument
}

const UpdateAbbreviationForm = ({
    data
}: Props) => {
    const router = useRouter();

    const udpateMutation = useUpdateAbbreviation();

    const schema = UPDATE_ABBREVIATION_SCHEMA;

    const abbreviation = data

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            abbreviation: abbreviation.abbreviation,
            name: abbreviation.name,
            type: abbreviation.type,
            _id: abbreviation._id.toString()
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        udpateMutation.mutate(values, {
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
                {BASE_ABBREVIATION_FIELDS.map
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

export default UpdateAbbreviationForm;
