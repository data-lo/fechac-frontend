import { Fragment } from "react";
import RestrictionTable from "./components/view-nomenclauture-table";
import EmptyMessage from "@/components/empty-message";
import Modal from "@/components/modal";
import { Plus } from "lucide-react";
import CreateNomenclatureForm from "./components/create-nomenclature/create_nomenclature-form";

const ViewNomenclatureSection = () => {

    let restrictions = [];

    return (
        <Fragment>
            <h1 className="font-bold text-xl">Restricciones</h1>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
                <Modal
                    dialogTitle={"Restricción"}
                    dialogDescription={"Aquí puedes establecer restricciones que determinan cómo deben nombrarse los archivos."}
                    icon={Plus}
                    dialogTrigger={"Crear Restricción"}
                    children={<CreateNomenclatureForm />}
                    sizeButton="sm:w-[338px] w-full"
                />
            </div>
            {restrictions.length > 0 ? (
                <RestrictionTable restrictions={[]} />
            ) : (
                <EmptyMessage text="Aún no se han creado restricciones." />
            )}

        </Fragment>
    )
}

export default ViewNomenclatureSection;
