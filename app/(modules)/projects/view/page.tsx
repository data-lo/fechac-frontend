import ViewProjectSection from "./view-project-section";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

export default function ProjectsPage({ searchParams }: Props) {
    return (
        <ViewProjectSection searchParams={searchParams} />
    )
}
