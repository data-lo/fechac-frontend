import ViewCriterionSection from "./view-criterion-section";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

export default function CriteriaPage({ searchParams }: Props) {
    return (
        <ViewCriterionSection searchParams={searchParams} />
    )
}
