'use client';

// 1. Librerías externas
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// 2. Acciones
import { deleteAbbreviation } from "../actions/delete-abbreviation";


export function useDeleteAbbreviation() {
    return useMutation({
        mutationFn: deleteAbbreviation,
        onSuccess: (response) => {
            if (response.success) toast.success("¡La abreviación ha sido eliminado con éxito!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}