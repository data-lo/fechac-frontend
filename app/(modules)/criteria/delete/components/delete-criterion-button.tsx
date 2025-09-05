'use client'

import { ObjectId } from "mongodb";
// 1. Hooks internos
import { useDeleteCriterion } from "../hooks/use-delete-criterion";

// 2.Componentes reutilizables
import ActionButton from "@/components/action-button";

interface DeleteCriterionProps {
  criterionId: string | ObjectId;
}

const DeleteCriterionButton = ({ criterionId }: DeleteCriterionProps) => {
  const deleteMutation = useDeleteCriterion();

  const handleDelete = () => {
    deleteMutation.mutate(criterionId);
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