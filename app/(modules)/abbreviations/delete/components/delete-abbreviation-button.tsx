'use client'

import { ObjectId } from "mongodb";
// 1. Hooks internos
import { useDeleteAbbreviation } from "../hooks/use-delete-abbreviation";

// 2.Componentes reutilizables
import ActionButton from "@/components/action-button";

interface Props {
    _id: string | ObjectId;
}

const DeleteAbbreviationButton = ({ _id }: Props) => {
    const deleteMutation = useDeleteAbbreviation();

    const handleDelete = () => {
        deleteMutation.mutate(_id);
    };

    return (
        <ActionButton
            title="Eliminar"
            className="w-auto"
            variant={"ghost"}
            isLoading={deleteMutation.isPending}
            onClick={handleDelete}
        />
    );
};

export default DeleteAbbreviationButton;