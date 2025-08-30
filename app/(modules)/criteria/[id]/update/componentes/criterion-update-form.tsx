'use client'

import { Fragment } from "react";
import { CriterionDocument } from "../../../models/criterion-document";
import { useForm } from "react-hook-form";
import { UPDATE_CRITERIA_SCHEMA } from "../schemas/update-criterion-schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CRITERION_FORM_FIELDS from "../fields/cirterion-update-fields";
import ActionButton from "@/components/action-button";

interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const CriterionUpdateForm = ({ data }: Props) => {

    const criterion = data.criterion;

    const form = useForm<z.infer<typeof UPDATE_CRITERIA_SCHEMA>>({
        resolver: zodResolver(UPDATE_CRITERIA_SCHEMA),
        defaultValues: {
            id: String(criterion._id),
            file_name: criterion.file_name,
            form_code: criterion.form_code,
            form_title: criterion.form_title,
            issuer: criterion.issuer,
            url_patter: criterion.url_pattern,
            destiny_drive: criterion.destiny_drive,
            destiny_path: criterion.destiny_path,
            organization_department: criterion.organization_department,
            mimetype: criterion.mimetype
        },
    });

    const onSubmit = (data: z.infer<typeof UPDATE_CRITERIA_SCHEMA>) => {

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CRITERION_FORM_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>
                <footer className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Guardar Información"
                        iconName="Save"
                    />
                </footer>
            </form>
        </Form>
    );
};

export default CriterionUpdateForm;