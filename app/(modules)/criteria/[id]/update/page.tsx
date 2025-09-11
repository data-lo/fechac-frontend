import { getCriterion } from "../actions/get-criterion";
import UpdateCriterionSection from "./update-criterion-section";

const UpdateCriterionPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const response = await getCriterion(id);

    if (!response.success || !response.data) {
        return <div className="p-8 text-center">Criterio no encontrado</div>;
    }

    return (
        <div className="h-screen">
            <UpdateCriterionSection data={{
                criterion: response.data.criterion
            }} />
        </div>
    );
}

export default UpdateCriterionPage;