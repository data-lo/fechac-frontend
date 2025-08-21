import ProjectSection from "./project-section";


interface Props {
    searchParams?: { page?: string; limit?: string };
}

export default function ProjectsPage({ searchParams }: Props) {
    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <ProjectSection searchParams={searchParams} />
            </div>
        </section>
    )
}
