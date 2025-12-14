'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { updateCriterion } from "../../../actions/update-criterion";

const useUpdateCriterion = () => {
    return useMutation({
        mutationFn: updateCriterion,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡El criterio se ha modificado con éxito!");
            } else {
                toast.error(response.error);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}

export default useUpdateCriterion