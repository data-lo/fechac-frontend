import ViewAbbreviationSection from "./view-abbreviation-section";

interface Props {
    searchParams: Promise<{ page?: string; limit?: string, query?: string }>;
}

const AbbreviationPage = ({ searchParams }: Props) => {

    return (
        <div className="h-screen">
            <ViewAbbreviationSection searchParams={searchParams}/>
        </div>
    )
}

export default AbbreviationPage;