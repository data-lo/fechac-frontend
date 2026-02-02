'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { updateCriterion } from "@/actions/criteria/update-criterion";

const useUpdateCriterion = () => {
    return useMutation({
        mutationFn: updateCriterion,
        onSuccess: (response) => {
            if (!response.success) {
                toast.error(response.message);

                return;
            }
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export default useUpdateCriterion