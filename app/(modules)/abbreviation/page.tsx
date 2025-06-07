import ViewAbbreviationSection from "./view-abbreviation-section";

const AbbreviationPage = () => {

    return (
        <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <ViewAbbreviationSection />
            </div>
        </section>
    )
}

export default AbbreviationPage;