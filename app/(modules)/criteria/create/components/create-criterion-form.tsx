'use client'

// 1. Librerías externas
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// 2. Componentes globales
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// 3. Hooks internos
import { useCreateCriterion } from "../../hooks/use-create-criterion";

// 4. Esquemas de validación
import CRITERIA_SCHEMA from "../../schema/criteria-schema";

// 5. Definiciones locales de campos
import {
    CRITERIA_CLASSIFICATION_FIELDS,
    CRITERIA_IDENTIFICATION_FIELDS,
    CRITERIA_PROJECT_FIELDS,
    CRITERIA_STORAGE_FIELDS
} from "../../fields/criteria-fields";

import { Criterion } from "../../../../../models/criteria/criterion";


const CreateCriterionForm = () => {

    const router = useRouter()

    const createCriterion = useCreateCriterion();

    const schema = CRITERIA_SCHEMA

    const form = useForm<z.infer<typeof CRITERIA_SCHEMA>>({
        resolver: zodResolver(CRITERIA_SCHEMA),
        defaultValues: {
            file_name: "",
            quality_system_code: "",
            file_types: [],
            department: "",
            target_drives: [],
            project_focus: [],
            project_area: [],
            project_type: [],
            primary_keywords: [],
            secondary_keywords: [],
            name_variants: [],
            target_path: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log(values)
        const normalized: Criterion = {
            ...values,
            primary_keywords: values.primary_keywords ?? null,
            secondary_keywords: values.secondary_keywords ?? null,
            name_variants: values.name_variants ?? null,
            target_path: values.target_path ?? null,
            is_active: true,
        };

        createCriterion.mutate(normalized, {
            onSuccess: (response) => {
                router.push(`/criteria/${response._id}/update`);
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 bg-white p-4">
                <h2 className="text-base font-semibold">IDENTIFICACIÓN DEL DOCUMENTO</h2>
                <p className="text-sm text-muted-foreground">
                    Información básica para identificar el criterio documental.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CRITERIA_IDENTIFICATION_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h2 className="text-base font-semibold">CLASIFICACIÓN Y BÚSQUEDA</h2>
                <p className="text-sm text-muted-foreground">
                    Palabras clave y etiquetas para facilitar la búsqueda del documento.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CRITERIA_CLASSIFICATION_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h2 className="text-base font-semibold">CONTEXTO DEL PROYECTO</h2>
                <p className="text-sm text-muted-foreground">
                    Información del proyecto al que pertenece este documento.
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CRITERIA_PROJECT_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h2 className="text-base font-semibold">ALMACENAMIENTO</h2>
                <p className="text-sm text-muted-foreground">
                    Define dónde se almacenará el documento dentro del sistema.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {CRITERIA_STORAGE_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <div className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Guardar Información"
                        iconName="Save"
                        isPending={createCriterion.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default CreateCriterionForm;