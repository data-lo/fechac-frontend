"use client"

// 1. Componentes globales
import ActionButton from "@/components/action-button";

// 2. Hooks locales
import { useDeleteRestriction } from "./hooks/use-delete-restriction";
import { useRouter } from "next/navigation";

interface Props {
    _id: string;
}

const DeleteRestrictionButton = ({
    _id,
}: Props) => {

    const router = useRouter();

    const deleteMutation = useDeleteRestriction();

    const onSubmit = async () => {
        deleteMutation.mutate({ _id }, {
            onSuccess: () => {
                router.refresh()
            }
        });
    };

    return (
        <ActionButton
            onClick={onSubmit}
            isPending={deleteMutation.isPending}
            title={"Eliminar"}
            variant="ghost"
            className="w-auto"
        />
    );
};

export default DeleteRestrictionButton;
