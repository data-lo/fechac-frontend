'use client';

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { uploadProjectAction } from "../actions/projects-action";

export function useProject() {
    const useUploadProjectFile = useMutation({
        mutationFn: async (files: File[]) => {
            return await uploadProjectAction(files);
        },
        onSuccess: (response) => {
            if (response.success) toast.success("¡El Archivo se ha subido con éxito!");
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    return {
        useUploadProjectFile
    }
}
