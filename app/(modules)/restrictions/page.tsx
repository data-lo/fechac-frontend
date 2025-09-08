import ViewNomenclatureSection from "./view-restriction-section";

interface Props {
    searchParams?: Promise<{ page?: string; limit?: string, query?: string }>;
}

const ViewNomenclaturePage = ({ searchParams }: Props) => {

    return (
        <div className="h-screen">
            <ViewNomenclatureSection searchParams={searchParams}/>
        </div>
    )
}

export default ViewNomenclaturePage;