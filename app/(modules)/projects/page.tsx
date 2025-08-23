import ViewProjectSection from "./view-project-section";


interface Props {
    searchParams: Promise<{ page?: string; limit?: string }>;
}

export default function ProjectsPage({ searchParams }: Props) {
    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6 relative">
                <ViewProjectSection searchParams={searchParams} />
            </div>
        </section>
    )
}
