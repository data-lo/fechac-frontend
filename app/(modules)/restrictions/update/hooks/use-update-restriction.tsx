'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import updateRestriction from "../../../../../actions/restrictions/update-restriction";

const useUpdateRestriction = () => {
    return useMutation({
        mutationFn: updateRestriction,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡La restricción se ha modificado con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}

export default useUpdateRestriction