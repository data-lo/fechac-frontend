'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import updateAbbreviation from "../actions/update-abbreviation";

const useUpdateAbbreviation = () => {
    return useMutation({
        mutationFn: updateAbbreviation,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡La abreviación se ha modificado con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}

export default useUpdateAbbreviation