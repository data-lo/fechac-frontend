'use client';

// External libraries
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
import { Form } from "@/components/ui/form";
import CommandButton from "@/components/button/command-button";

// Hooks
import useUpdatePeriodicity from "../../hooks/useUpdatePeriodicity";

// Schemas & form configuration
import SCHEDULE_SCHEMA from "../../schemas/schedule-schema";
import { FORM_SHEDULE_FIELDS } from "../../fields/form-scheduled-field";

// DTOs / Types
import { ScheduledJobDto } from "@/applications/schedules/dto/scheduled-job.dto";

interface Props {
    latestSchedule: ScheduledJobDto | null
}

export default function ScheduleSettingsForm({
    latestSchedule
}: Props) {
    const updatePeriodicity = useUpdatePeriodicity();

    const form = useForm<z.infer<typeof SCHEDULE_SCHEMA>>({
        resolver: zodResolver(SCHEDULE_SCHEMA),
        defaultValues: {
            periodicity: latestSchedule?.periodicity ?? undefined
        },
    });

    const onSubmit = async (values: z.infer<typeof SCHEDULE_SCHEMA>) => {
        updatePeriodicity.mutate(values.periodicity);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 bg-white"
            >
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {FORM_SHEDULE_FIELDS
                        .map(({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}

                </div>

                <div className="flex justify-end">
                    <CommandButton
                        icon="Save"
                        width="min"
                        isLoading={updatePeriodicity.isPending}
                    >
                        Guardar
                    </CommandButton>
                </div>
            </form>
        </Form>
    )
}
