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
import { CRITERIA_SCHEMA } from "../../schema/criteria-schema";

// 5. Definiciones locales de campos
import {
    CRITERIA_CLASSIFICATION_FIELDS,
    CRITERIA_IDENTIFICATION_FIELDS,
    CRITERIA_PROJECT_FIELDS,
    CRITERIA_STORAGE_FIELDS
} from "../../fields/criteria-fields";


const CreateCriterionForm = () => {

    const router = useRouter()

    const createMutation = useCreateCriterion();

    const schema = CRITERIA_SCHEMA

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            file_name: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        // createMutation.mutate(values, {
        //     onSuccess: (response) => {
        //         if (response.success && response.data) {
        //             router.push(`/criteria/${response.data.insertedId}/update`);
        //         }
        //     },
        // });
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

                <footer className="flex justify-end">
                    <ActionButton
                        type="submit"
                        title="Guardar Información"
                        iconName="Save"
                        isPending={createMutation.isPending}
                    />
                </footer>
            </form>
        </Form>
    );
};

export default CreateCriterionForm;