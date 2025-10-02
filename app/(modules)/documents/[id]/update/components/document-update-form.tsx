'use client';

import { useEffect } from "react";
import * as z from "zod";
import { useForm, type DefaultValues, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";


import { FileDocument } from "../../../models/file-document";


import { UPDATE_DOCUMENT_SCHEMA } from "../schemas/update-document-schema";


import {
    FORM_IDENTIFICATION_FIELDS,
    FORM_ACCESS_FIELDS,
    FORM_CLASSIFICATION_FIELDS,
    FORM_LINKAGE_FIELDS,
    FORM_STATUS_FIELDS,
    FORM_METADATA_FIELDS
} from "../../../fields/base-document-fields"


import useUpdateDocument from "../hooks/use-update-document";



interface Props {
    data: {
        document: FileDocument
    }
}

const DocumentUpdateForm = ({ data }: Props) => {
    
    const updateMutation = useUpdateDocument();

    const document = data.document;

    type InputValues = z.input<typeof UPDATE_DOCUMENT_SCHEMA> & {
        metadata_readonly?: string;
    };

    type OutputValues = z.output<typeof UPDATE_DOCUMENT_SCHEMA>;

    const form = useForm<InputValues>({
        resolver: zodResolver(UPDATE_DOCUMENT_SCHEMA),
        mode: "onChange",
        reValidateMode: "onChange",
        shouldUnregister: true,
        defaultValues: {
            _id: String(document._id),
            uuid: document.uuid,
            path: document.path,
            download_url: document.download_url,
            area: document.area,
            is_multimedia: document.is_multimedia ? "true" : "false",
            project_id: document.project_id,
            metadata_readonly: JSON.stringify(document.metadata ?? {}, null, 2),
            status: document.status,
            item_id: document.item_id
        } as DefaultValues<InputValues>,
    });

   useEffect(() => {
        form.register("metadata");
        form.setValue("metadata", document.metadata ?? {});
    }, [document.metadata, form])

    const onSubmitError = (errs: any) => {
        console.warn("Form errors:", errs);
    };

    const onSubmit: SubmitHandler<InputValues> = (values) => {
        console.log(values);
        const parsed: OutputValues = UPDATE_DOCUMENT_SCHEMA.parse(values);
        updateMutation.mutate(parsed);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="flex flex-col gap-6">

                <input type="hidden" {...form.register("_id")} />
                <input type="hidden" {...form.register("uuid")} />

                <h1 className="text-base font-semibold">Identificación</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_IDENTIFICATION_FIELDS.map
                        (({ component: Component, props}, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Acceso</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_ACCESS_FIELDS.map(({ component: Component, props }, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}
                </div>

                <h1 className="text-base font-semibold">Clasificación</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_CLASSIFICATION_FIELDS.map(({ component: Component, props}, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}
                </div>
                
                <h1 className="text-base font-semibold">Enlaces</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_LINKAGE_FIELDS.map(({ component: Component, props}, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}
                </div>

                <h1 className="text-base font-semibold">Estatus</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_STATUS_FIELDS.map(({ component: Component, props}, index) => (
                        <Component key={index} {...props} control={form.control} />
                    ))}
                </div>

                <h1 className="text-base font-semibold">Metadata</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_METADATA_FIELDS.map(({ component: Component, props}, index) => (
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