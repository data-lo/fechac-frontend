'use client'

// 1. React
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 2. Componentes globales
import { Form } from "@/components/ui/form";
import ActionButton from "@/components/action-button";

// 3. Modelos
import { CriterionDocument } from "../../../models/criterion-document";

// 4. Esquemas de validación
import { UPDATE_CRITERIA_SCHEMA } from "../schemas/update-criterion-schema";

// 5. Definiciones locales de campos
import { 
  FORM_IDENTIFICATION_FIELDS, 
  VERSION_CONTROL_FIELDS, 
  ACCESS_FIELDS, 
  CONTENT_FIELDS, 
  CLASSIFICATION_FIELDS, 
  STORAGE_FIELDS 
} from "../../../fields/base-criteria-fields";

// 6. Hooks
import useUpdateCriterion from "../hooks/use-update-criterion";


interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const CriterionUpdateForm = ({ data }: Props) => {

    const updateMutation = useUpdateCriterion();

    const criterion = data.criterion;

    const form = useForm<z.infer<typeof UPDATE_CRITERIA_SCHEMA>>({
        resolver: zodResolver(UPDATE_CRITERIA_SCHEMA),
        defaultValues: {
            _id: String(criterion._id),
            file_name: criterion.file_name,
            form_code: criterion.form_code,
            form_title: criterion.form_title,
            issuing_organization: criterion.issuing_organization,
            access_url: criterion.access_url,
            destination_drive: criterion.destination_drive,
            destination_path: criterion.destination_path,
            department: criterion.department,
            file_type: criterion.file_type,
            main_sections: criterion.main_sections,
            additional_keywords: criterion.additional_keywords,
            domain_tags: criterion.domain_tags,
            revision_date: criterion.revision_date,
            revision_number: criterion.revision_number,
            standard_fields: criterion.standard_fields
        },
    });

    const onSubmit = (values: z.infer<typeof UPDATE_CRITERIA_SCHEMA>) => {
        console.log(values)
        updateMutation.mutate(values);
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
                        isPending={updateMutation.isPending}
                    />
                </footer>
            </form>
        </Form>
    );
};

export default CriterionUpdateForm;