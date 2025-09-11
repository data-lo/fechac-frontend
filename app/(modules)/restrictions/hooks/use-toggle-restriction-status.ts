'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { toggleRestrictionStatus } from "../actions/toggle-restriction-status";

export function useToggleRestrictionStatus() {
    return useMutation({
        mutationFn: toggleRestrictionStatus,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡El estatus se ha modificado con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}