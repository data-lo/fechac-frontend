import ViewNomenclatureSection from "./view-nomenclature-section";

const ViewNomenclaturePage = () => {

    return(
         <section className="py-6 px-8 w-full h-full overflow-y-auto flex flex-col">
            <div className="w-full flex flex-col h-auto gap-6">
                <ViewNomenclatureSection />
            </div>
        </section>
    )
}

export default ViewNomenclaturePage;