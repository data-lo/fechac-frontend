'use client';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FILE_PROJECT_SCHEMA, FILE_PROJECT_FORM } from "./schema/file-project";
import { AlertTriangle } from "lucide-react";
import { useSynchronizeProjects } from "./hooks/use-synchronize-projects";
import ActionButton from "@/components/action-button";



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
                <ActionButton
                    type="submit"
                    title="Sincronizar Projectos"
                    iconName="RefreshCcw"
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
                            <div className="flex items-start space-x-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-red-700 text-sm font-medium">
                                    {errors.file.message}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            />
        </form>
    );
}

export default UploadFileSection;
