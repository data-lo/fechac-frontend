'use client';

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import synchronizeProjects from "@/actions/projects/synchronize-projects";

export function useSynchronizeProjects() {
    return useMutation({
        mutationFn: synchronizeProjects,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡El Archivo se ha subido con éxito!");
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}
