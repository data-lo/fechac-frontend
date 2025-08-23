'use client';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FILE_PROJECT_SCHEMA, FILE_PROJECT_FORM } from "./schema/file-project";
import ButtonComponent from "@/components/action-button";
import { RefreshCcw } from "lucide-react";
import { useSynchronizeProjects } from "./hooks/use-synchronize-projects";



const UploadFileSection = () => {

    const mutation = useSynchronizeProjects();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FILE_PROJECT_FORM>({
        resolver: zodResolver(FILE_PROJECT_SCHEMA),
        defaultValues: {
            file: []
        },
    });

    const onSubmit = async (data: FILE_PROJECT_FORM) => {
        mutation.mutate(data.file, {
            onSuccess: () => {
                reset()
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-end">
                <ButtonComponent
                    type="submit"
                    title="Sincronizar Projectos"
                    icon={RefreshCcw}
                    isPending={mutation.isPending}
                />
            </div>

            <Controller
                control={control}
                name="file"
                render={({ field }) => (
                    <div>
                        <FilePond
                            files={field.value}
                            allowMultiple={false}
                            maxFiles={1}
                            acceptedFileTypes={["text/csv"]}
                            credits={false}
                            labelIdle='Arrastra o Selecciona tu Archivo CSV'
                            onupdatefiles={(fileItems) =>
                                field.onChange(fileItems.map((f) => f.file as File))
                            }
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm">
                                {errors.file.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </form>
    );
}

export default UploadFileSection;
