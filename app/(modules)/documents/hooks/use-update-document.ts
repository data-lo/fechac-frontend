'use client';
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { updateDocumentAction } from "../actions/update-document-action";

const useUpdateDocument = () => {
    return useMutation({
        mutationFn: updateDocumentAction,
        onSuccess: (response) => {
            if (response.success) {
                toast.success("¡El documento se ha modificado con exito!");
            } else {
                toast.error(response.error);
            }
        },
        onError(error) {
            toast.error(`Error: ${error.message}`);
        },
    });
}

export default useUpdateDocument