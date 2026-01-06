'use client';
// External libraries
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// Form configuration
import SCHEDULE_SCHEMA from "../../schemas/schedule-schema";
import { FORM_SHEDULE_FIELDS } from "../../fields/form-scheduled-field";
import upsertScheduler from "@/actions/scheduler/upsert-scheduler";
import toast from "react-hot-toast";

export default function ScheduleSettingsForm() {
    const schema = SCHEDULE_SCHEMA

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            periodicity: undefined
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            await upsertScheduler(values.periodicity);

            toast.success("La periodicidad del pipeline se configuró correctamente.");
        } catch (error) {
            toast.error("Ocurrió un error al configurar la periodicidad del pipeline.");
            console.error("Error al configurar la periodicidad:", error);
        }
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
                    <ActionButton
                        type="submit"
                        title="Guardar"
                        iconName="Save"
                        className="w-full"
                    />
                </div>
            </form>
        </Form>
    )
}
