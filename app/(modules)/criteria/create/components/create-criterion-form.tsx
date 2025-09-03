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
import { useCreateCriterion } from "../hooks/use-create-criterion";

// 4. Esquemas de validación
import { BASE_CRITERIA_SCHEMA } from "../../schemas/base-criteria-form";

// 5. Definiciones locales de campos
import {
    FORM_IDENTIFICATION_FIELDS,
    VERSION_CONTROL_FIELDS,
    ACCESS_FIELDS,
    CONTENT_FIELDS,
    CLASSIFICATION_FIELDS,
    STORAGE_FIELDS
} from "../../fields/base-criteria-fields";


const CreateCriterionForm = () => {

    const router = useRouter()

    const createMutation = useCreateCriterion();

    const form = useForm<z.infer<typeof BASE_CRITERIA_SCHEMA>>({
        resolver: zodResolver(BASE_CRITERIA_SCHEMA),
        defaultValues: {
            file_name: "",
            form_code: "",
            form_title: "",
            issuing_organization: "",
            access_url: "",
            destination_drive: "",
            destination_path: "",
            department: "",
            file_type: "",
            main_sections: [],
            additional_keywords: [],
            domain_tags: [],
            revision_date: new Date(),
            revision_number: "",
            standard_fields: [],
        },
    });

    const onSubmit = async (values: z.infer<typeof BASE_CRITERIA_SCHEMA>) => {
        createMutation.mutate(values, {
            onSuccess: (response) => {
                if (response.success && response.data) {
                    router.push(`/criteria/${response.data.insertedId}/update`);
                }
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h1 className="text-base font-semibold">Identificación del Archivo</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FORM_IDENTIFICATION_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Versiones</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {VERSION_CONTROL_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Acceso</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ACCESS_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Contenido del Documento</h1>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {CONTENT_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Palabras Clave</h1>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {CLASSIFICATION_FIELDS.map
                        (({ component: Component, props }, index) => (
                            <Component key={index} {...props} control={form.control} />
                        ))}
                </div>

                <h1 className="text-base font-semibold">Almacenamiento</h1>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {STORAGE_FIELDS.map
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

export default CreateCriterionForm;