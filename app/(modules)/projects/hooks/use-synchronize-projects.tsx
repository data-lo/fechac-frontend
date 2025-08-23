'use client';

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { synchronizeProjectsAction } from "../actions/synchronize-projects-action";

export function useSynchronizeProjects() {
    return useMutation({
        mutationFn: synchronizeProjectsAction,
        onSuccess: (response) => {
            if (response.success) toast.success("¡El Archivo se ha subido con éxito!");
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}
