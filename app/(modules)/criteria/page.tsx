import ViewCriteriaSection from "./view-criterion-section";

interface Props {
    searchParams: Promise<{ page?: string; limit?: string, query?: string }>;
}

export default function CriteriaPage({ searchParams }: Props) {
    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6 relative">
                <ViewCriteriaSection searchParams={searchParams} />
            </div>
        </section>
    )
}
