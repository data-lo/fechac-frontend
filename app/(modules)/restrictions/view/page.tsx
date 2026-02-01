import ViewNomenclatureSection from "./view-restriction-section";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewNomenclaturePage = ({ searchParams }: Props) => {

    return (
        <ViewNomenclatureSection searchParams={searchParams} />
    )
}

export default ViewNomenclaturePage;