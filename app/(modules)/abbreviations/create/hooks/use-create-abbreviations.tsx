'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { createAbbreviation } from "../actions/create-abbreviation";

export function useCreateAbbreviation() {
    return useMutation({
        mutationFn: createAbbreviation,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡La restricción se ha creado con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}