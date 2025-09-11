'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { createCriterion } from "../actions/create-criterion";

export function useCreateCriterion() {
    return useMutation({
        mutationFn: createCriterion,
        onSuccess: (response) => {
            if (response.success) toast.success("¡El criterio se ha creado con éxito!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}