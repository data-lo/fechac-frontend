'use client';

import toast from "react-hot-toast"

import { useMutation } from "@tanstack/react-query";

import { getPendingDocumentsAction } from "../../../../actions/files/get-pending-documents";

export function useGetPendingDocuments() {
    return useMutation({
        mutationFn: getPendingDocumentsAction,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡Se han obtenido los documentos pendientes!");
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
}