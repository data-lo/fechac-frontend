'use client'
import ActionButton from "@/components/action-button";
import { useRouter } from "next/navigation";

const CreateCriterionButtonSection = () => {
    const router = useRouter();

    const handleCreateCriterion = () => {
        router.push('/criteria/create');
    };

    return (
        <div className="flex justify-end">
            <ActionButton
                title="Crear Criterio"
                iconName="Plus"
                onClick={handleCreateCriterion}
            />
        </div>
    );
};

export default CreateCriterionButtonSection;