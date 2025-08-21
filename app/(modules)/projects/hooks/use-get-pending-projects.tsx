'use client';

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getPendingProjects } from "../actions/get-pending-projects-action";


export function useGetPendingProjects() {
    return useMutation({
        mutationFn: getPendingProjects,
        onSuccess: (response) => {
            if (response.success) toast.success("¡Se ha obtenido los proyectos pendientes!");
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}