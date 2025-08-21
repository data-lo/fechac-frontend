'use client';

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createProjectsFromCSVAction } from "../actions/create-projects-from-csv-action";

export function useCreateProjectsFromCSV() {
    return useMutation({
        mutationFn: async (files: File[]) => {
            return await createProjectsFromCSVAction(files);
        },
        onSuccess: (response) => {
            if (response.success) toast.success("¡El Archivo se ha subido con éxito!");
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}
