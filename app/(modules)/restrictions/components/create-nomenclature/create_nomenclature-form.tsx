"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import * as z from "zod";
import { Save } from "lucide-react";

import { CREATE_NOMENCLATURE_FIELDS } from "./create-nomenclature-fields";

import { CREATE_NOMENCLATURE_SCHEMA } from "./create_nomenclature-schema";

import Button from "@/components/action-button";

import { createRestriction } from "@/actions/nomenclature-action";
import { InsertResponse } from "@/interfaces/mongo/mongo-response";
import { isInsertResponse } from "@/guard/is-insert-response";
import { useState } from "react";
import toast from "react-hot-toast";
import ActionButton from "@/components/action-button";


const CreateNomenclatureForm = () => {

    const [isPending, setPending] = useState(false);

    const schema = CREATE_NOMENCLATURE_SCHEMA;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            character: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setPending(true);
            const response: InsertResponse = await createRestriction(values);

            if (!isInsertResponse(response)) {
                toast.error("Ocurrió un error al crear la regla de restricción.");
                return;
            }

            toast.success("La regla de restricción ha sido creada con éxito.");
            
            form.reset();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Ocurrió un error inesperado al crear la regla.";
            toast.error(message);
            console.error(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >



{CREATE_NOMENCLATURE_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}

                <div className="flex justify-end mt-8">
                    <ActionButton
                        iconName={"Save"}
                        title="Guardar"
                        isPending={isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default CreateNomenclatureForm;
