'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateCriterion } from "@/actions/criteria/update-criterion";

// 2. Acciones

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