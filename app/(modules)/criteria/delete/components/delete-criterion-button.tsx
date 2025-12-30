'use client'

import { ObjectId } from "mongodb";
// 1. Hooks internos
import { useDeleteCriterion } from "../hooks/use-delete-criterion";

// 2.Componentes reutilizables
import ActionButton from "@/components/action-button";

interface Props {
  _id: string | ObjectId;
}

const DeleteCriterionButton = ({ _id }: Props) => {
  const deleteMutation = useDeleteCriterion();

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

export default DeleteCriterionButton;