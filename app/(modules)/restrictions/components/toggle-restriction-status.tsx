"use client"

// 1. Componentes globales
import ActionButton from "@/components/action-button";

// 2. Hooks locales
import { useToggleRestrictionStatus } from "../hooks/use-toggle-restriction-status";

interface Props {
    _id: string;
    status: boolean;
}

const ToggleRestrictionStatus = ({
    _id,
    status
}: Props) => {

    const updateMutation = useToggleRestrictionStatus();

    const text = status ? 'Desactivar' : 'Activar'

    const onSubmit = async () => {
        updateMutation.mutate({ _id, status });
    };

    return (
        <ActionButton
            onClick={onSubmit}
            isPending={updateMutation.isPending}
            title={text}
            variant="ghost"
            className="w-auto"
        />
    );
};

export default ToggleRestrictionStatus;
