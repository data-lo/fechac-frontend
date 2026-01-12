'use client';
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { updateDocument } from "@/actions/files/update-document";

const useUpdateDocument = () => {
    return useMutation({
        mutationFn: updateDocument,
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError(error) {
            toast.error(error.message);
        },
    });
}

export default useUpdateDocument