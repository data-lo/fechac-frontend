import { Fragment } from "react";
import { CriterionDocument } from "../../models/criterion-document";
import UpdateCriterionForm from "./componentes/criterion-update-form";

interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const UpdateCriterionSection = ({ data }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <nav className="h-12 flex justify-between items-center px-4 border-b-2 bg-white sticky top-0 z-10">
                <h2 className="text-xl font-semibold">
                    <span className="text-black">CRITERIO:</span>{" "}
                    {data.criterion.form_title}
                </h2>
            </nav>
            
            <div className="flex-1 overflow-auto p-4">
                <UpdateCriterionForm
                    data={{ criterion: data.criterion }}
                />
            </div>
        </div>
    );
};
export default UpdateCriterionSection;