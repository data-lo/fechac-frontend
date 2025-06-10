"use client"

import { changeStatusRestriction } from "@/actions/nomenclature-action";
import { useState } from "react";
import toast from "react-hot-toast";
import ButtonComponent from "@/components/button-component";
import { isUpdateResponse } from "@/guard/is-update-response";
import { Pencil } from "lucide-react";

interface Props {
    id: string;
    isActive: boolean;
}

const StatusNomenclatureForm = ({
    id,
    isActive
}: Props) => {

    const [isPending, setPending] = useState(false);

    const text = isActive ? 'Desactivar' : 'Activar'

    const onSubmit = async () => {
        try {
            setPending(true);

            const response = await changeStatusRestriction({ id: id, isActive: isActive });

            if (!isUpdateResponse(response)) {
                toast.error(`Ocurrió un error al ${text} la regla de restricción.`);
                return;
            }

            toast.success("La regla de restricción ha sido actualizada con éxito.");
        } catch (error) {
            toast.error("Ocurrió un error inesperado. Intenta nuevamente.");
            console.error(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="flex justify-end mt-8">
            <ButtonComponent
                onClick={onSubmit}
                isPending={isPending}
                title={text}
                icon={Pencil}
            />
        </div>
    );
};

export default StatusNomenclatureForm;
