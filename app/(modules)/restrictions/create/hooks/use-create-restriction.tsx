'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { createRestriction } from "../../../../../actions/restrictions/create-restriction";

function useCreateRestriction() {
    return useMutation({
        mutationFn: createRestriction,
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

export default useCreateRestriction