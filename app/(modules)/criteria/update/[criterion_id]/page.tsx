import { getCriterionAction } from "./actions/get-criterion-action";

import UpdateCriterionSection from "./update-criterion-section";

export default async function UpdateCriterionPage({
    params,
}: {
    params: Promise<{ criterion_id: string }>
}) {
    const { criterion_id } = await params;

    if (!criterion_id || typeof criterion_id !== 'string') {
        console.error('[ERROR] Invalid or missing id parameter:', { params, criterion_id });
        return <div>Invalid criteria ID</div>;
    }
    const criterion = await getCriterionAction(criterion_id);

    if (!criterion) {
        return <div className="p-8 text-center">Criterio no encontrado</div>;
    }

    return (
        <UpdateCriterionSection data={{
            criterion: criterion
        }} />
    );
}

