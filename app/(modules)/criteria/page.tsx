import ViewCriteriaSection from "./view-criterion-section";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

export default function CriteriaPage({ searchParams }: Props) {
    return (
         <div className="h-screen">
                <ViewCriteriaSection searchParams={searchParams} />
        </div>
    )
}
