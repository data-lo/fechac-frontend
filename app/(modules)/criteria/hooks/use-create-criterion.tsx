'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import createCriterion from "@/actions/criteria/create-criterion";

export function useCreateCriterion() {
    return useMutation({
        mutationFn: createCriterion,
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}