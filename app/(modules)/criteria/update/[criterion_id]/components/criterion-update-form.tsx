'use client'

// 1. React
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 2. Componentes globales
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// 3. Modelos


// 4. Esquemas de validación
import UPDATE_CRITERIA_SCHEMA from "../../../schema/update-criteria-schema";

// 5. Definiciones locales de campos
import { CRITERIA_IDENTIFICATION_FIELDS, CRITERIA_CLASSIFICATION_FIELDS, CRITERIA_PROJECT_FIELDS, CRITERIA_STORAGE_FIELDS } from "../../../fields/criteria-fields";

// 6. Hooks
import useUpdateCriterion from "../../../hooks/use-update-criterion";
import CriterionDocument from "@/models/criteria/criterion-document";

interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const CriterionUpdateForm = ({ data }: Props) => {

    const updateCriterion = useUpdateCriterion();

    const criterion = data.criterion;

    const form = useForm<z.infer<typeof UPDATE_CRITERIA_SCHEMA>>({
        resolver: zodResolver(UPDATE_CRITERIA_SCHEMA),
        defaultValues: {
            department: criterion.department,
            file_name: criterion.file_name,
            file_types: criterion.file_types,
            name_variants: criterion.name_variants,
            primary_keywords: criterion.primary_keywords,
            secondary_keywords: criterion.secondary_keywords,
            project_area: criterion.project_area,
            quality_system_code: criterion.quality_system_code ?? "N/A",
            project_focus: criterion.project_focus,
            project_type: criterion.project_type,
            target_drives: criterion.target_drives,
            target_path: criterion.target_path
        },
    });

    const onSubmit = (values: z.infer<typeof UPDATE_CRITERIA_SCHEMA>) => {
        updateCriterion.mutate({ _id: criterion._id, payload: values });
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
                        isPending={updateCriterion.isPending}
                    />
                </div>
            </form>
        </Form>
    );
};

export default CriterionUpdateForm;