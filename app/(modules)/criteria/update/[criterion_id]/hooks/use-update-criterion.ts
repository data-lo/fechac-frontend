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
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export default useUpdateCriterion