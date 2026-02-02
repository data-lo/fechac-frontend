// External libraries
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// Actions
import upsertScheduler from "@/actions/scheduler/upsert-scheduler";

// Enums
import { Periodicity } from "@/enums/periodicity";
import { useRouter } from "next/navigation";

const useUpdatePeriodicity = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (periodicity: Periodicity) => {
            return await upsertScheduler(periodicity);
        },
        onSuccess: (response) => {
            if (!response.success) {
                toast.error("¡No se pudo configurar la periodicidad del pipeline!");
                return;
            }

            router.refresh();
            
            toast.success("¡La periodicidad del pipeline se configuró correctamente!");
        },
        onError(error) {
            toast.error(error.message);
        },
    });
}

export default useUpdatePeriodicity;