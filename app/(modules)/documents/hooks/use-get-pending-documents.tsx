'use client';

import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query";
import { getPendingDocuments } from "../actions/get-pending-documents";


export function useGetPendingDocuments(){
    return useMutation({
        mutationFn: getPendingDocuments,
        onSuccess: (response) => {
            if (response.success) toast.success("¡Se han obtenido los documentos penidentes!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}