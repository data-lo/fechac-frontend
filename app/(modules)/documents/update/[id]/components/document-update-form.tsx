'use client';

import * as z from "zod";


import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";



import { useForm, type SubmitHandler } from "react-hook-form";


import ActionButton from "@/components/action-button";

import { DocumentEntity } from "../../../models/document-entity";

import {
    FORM_IDENTIFICATION_FIELDS,
    FORM_ACCESS_FIELDS,
    FORM_CLASSIFICATION_FIELDS,
    FORM_LINKAGE_FIELDS,
    FORM_STATUS_FIELDS,
    FORM_METADATA_FIELDS
} from "../../../fields/document-fields"


import useUpdateDocument from "../../../hooks/use-update-document";

import UPDATE_DOCUMENT_SCHEMA from "../../../schemas/update-document-schema";

interface Props {
    data: {
        document: DocumentEntity
    }
}

const DocumentUpdateForm = ({ data }: Props) => {

    const updateMutation = useUpdateDocument();

    const document = data.document;

    const form = useForm<z.infer<typeof UPDATE_DOCUMENT_SCHEMA>>({
        resolver: zodResolver(UPDATE_DOCUMENT_SCHEMA),
        defaultValues: {
            uuid: "",
            sadap_id: "",
            selected_criterion_id: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UPDATE_DOCUMENT_SCHEMA>) => {
        console.log(values)
        // updateMutation.mutate(values);
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white p-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_IDENTIFICATION_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <footer className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Guardar Información"
                        iconName="Save"
                        isPending={updateMutation.isPending}
                    />
                </footer>
            </form>
        </Form>
    );
};

export default DocumentUpdateForm;