'use client';

import z from "zod";
import ActionButton from "@/components/action-button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SCHEDULE_SCHEMA from "../../schemas/schedule-schema";
import { FORM_SHEDULE_FIELDS } from "../../fields/form-scheduled-field";


export default function ScheduleSettingsForm() {



    const schema = SCHEDULE_SCHEMA

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            periodicity: undefined,
            triggerNow: false
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {

    };

    // const FIELDS = applyFormOverrides(
    //     FORM_SHEDULE_FIELDS,
    //     {
    //         selected_criterion_id: {
    //             props: {
    //                 items: data.criteriaItems,
    //             },

    //         },
    //     }
    // );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white p-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {FORM_SHEDULE_FIELDS
                        .map(({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}

                </div>

                <div className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Actualizar Información"
                        iconName="Save"

                    />
                </div>
            </form>
        </Form>
    )
}
