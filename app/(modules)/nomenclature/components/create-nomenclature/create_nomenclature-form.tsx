"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import * as z from "zod";
import { Save } from "lucide-react";

import { CREATE_NOMENCLATURE_FIELDS } from "./create-nomenclature-fields";

import { CREATE_NOMENCLATURE_SCHEMA } from "./create_nomenclature-schema";

import Button from "@/components/button";

import { createRestriction } from "@/actions/nomenclature-action";
import { InsertResponse } from "@/interfaces/insert-response";
import { isInsertResponse } from "@/guard/is-insert-response";
import { useState } from "react";


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
        const response: InsertResponse = await createRestriction(values);

        if (!isInsertResponse){
            // toast

            return
        }

    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >

                {CREATE_NOMENCLATURE_FIELDS.map(({ component: Component, props }, index) => (
                    <Component
                        key={index}
                        {...props}
                        formControl={form.control}
                    />
                ))}

                <div className="flex justify-end">
                    <Button
                        icon={Save}
                        title="Guardar"
                    />
                </div>
            </form>
        </Form>
    );
};

export default CreateNomenclatureForm;
