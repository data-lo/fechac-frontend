'use client';
import { useMutation } from "@tanstack/react-query";

import getProjectBySadapId from "@/actions/projects/get-project-by-sadap-id";

export default function useGetProjectBySadapId() {
    return useMutation({
        mutationFn: (sadap_id: string) => getProjectBySadapId(sadap_id),
    });
}


