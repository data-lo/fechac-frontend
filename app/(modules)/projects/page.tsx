import ViewProjectSection from "./view-project-section";


interface Props {
    searchParams: Promise<{ page?: string; limit?: string, query?: string }>;
}

export default function ProjectsPage({ searchParams }: Props) {
    return (
        <div className="h-screen">
            <ViewProjectSection searchParams={searchParams} />
        </div>
    )
}
