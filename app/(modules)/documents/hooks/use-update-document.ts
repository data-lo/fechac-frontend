'use client';
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { updateDocumentAction } from "../../../../actions/files/update-document";

const useUpdateDocument = () => {
    return useMutation({
        mutationFn: updateDocumentAction,
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError(error) {
            toast.error(error.message);
        },
    });
}

export default useUpdateDocument