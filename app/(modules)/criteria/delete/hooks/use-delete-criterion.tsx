'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { deleteCriterion } from "../actions/delete-criterion";


export function useDeleteCriterion() {
    return useMutation({
        mutationFn: deleteCriterion,
        onSuccess: (response) => {
            if (response.success) toast.success("¡El criterio ha sido eliminado con éxito!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}