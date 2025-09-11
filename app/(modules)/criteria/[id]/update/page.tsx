import { getCriterion } from "../actions/get-criterion";
import UpdateCriterionSection from "./update-criterion-section";

export default async function UpdateCriterionPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
        console.error('[ERROR] Invalid or missing id parameter:', { params, id });
        return <div>Invalid criteria ID</div>;
    }
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

