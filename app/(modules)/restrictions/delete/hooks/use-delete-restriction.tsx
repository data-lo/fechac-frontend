'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { deleteRestriction } from "../actions/delete-restriction";

export const useDeleteRestriction = () => {
    return useMutation({
        mutationFn: deleteRestriction,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡La restricción ha sido eliminada con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error: any) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}
