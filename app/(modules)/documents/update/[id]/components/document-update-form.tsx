'use client';

// External libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// Domain models and enums
import { FileStatus } from "@/enums/file-status";
import FileDocument from "@/models/files/file-document";

// Form configuration
import {
    FORM_IDENTIFICATION_FIELDS,
} from "../../../fields/document-fields";
import UPDATE_DOCUMENT_SCHEMA from "../../../schemas/update-file-schema";

// Hooks and actions
import useUpdateDocument from "../../../hooks/use-update-document";

// Utilities
import applyFormOverrides from "@/functions/apply-form-overrides";


interface Props {
    data: {
        document: FileDocument
        criteriaItems: any
    }
}

const DocumentUpdateForm = ({ data }: Props) => {

    const router = useRouter();

    const document = data.document;

    const updateDocument = useUpdateDocument();

    const form = useForm<z.infer<typeof UPDATE_DOCUMENT_SCHEMA>>({
        resolver: zodResolver(UPDATE_DOCUMENT_SCHEMA),
        defaultValues: {
            sadap_id: document.sadap_id ?? "",
            selected_criterion_id: document.selected_criterion_id ?? "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UPDATE_DOCUMENT_SCHEMA>) => {
        updateDocument.mutate(
            {
                _id: data.document._id.toString(),
                payload: values
            },
            {
                onSuccess: () => {
                    form.reset()
                    router.refresh();
                }
            });
    };

    const FORM_IDENTIFICATION_FIELDS_UPDATED = applyFormOverrides(
        FORM_IDENTIFICATION_FIELDS,
        {
            selected_criterion_id: {
                props: {
                    items: data.criteriaItems,
                    hidden: data.document.status !== FileStatus.REQUIRES_HUMAN_REVIEW
                },

            },
        }
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white p-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {FORM_IDENTIFICATION_FIELDS_UPDATED
                        .filter(field => field.props.hidden !== true)
                        .map(({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}

                </div>

                <div className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Actualizar Información"
                        iconName="Save"
                        isPending={updateDocument.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default DocumentUpdateForm;

