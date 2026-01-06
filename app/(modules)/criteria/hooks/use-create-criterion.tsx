'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import createCriterionAction from "../actions/create-criterion-action";

export function useCreateCriterion() {
    return useMutation({
        mutationFn: createCriterionAction,
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}