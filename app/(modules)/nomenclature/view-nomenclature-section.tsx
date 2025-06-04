import { Fragment } from "react";
import RestrictionTable from "./components/view-nomenclauture-table";
import EmptyMessage from "@/components/empty-message";
import Modal from "@/components/modal";
import { Plus } from "lucide-react";

const ViewNomenclatureSection = () => {

    let restrictions = [];

    return (
        <Fragment>
            <h1 className="font-bold text-xl">Restricciones</h1>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
                <Modal
                    dialogTitle={"Crear Restricción"}
                    dialogDescription={"Aquí puedes establecer restricciones que determinan cómo deben nombrarse los archivos."}
                    icon={Plus}
                    dialogTrigger={"Crear Restricción"}
                    children={undefined}
                    sizeButton="sm:w-[338px] w-full"
                />
            </div>
            {restrictions.length > 0 ? (
                <RestrictionTable restrictions={[]} />
            ) : (
                <EmptyMessage text="Aún no se han creado restricciones de ningún tipo." />
            )}

        </Fragment>
    )
}

export default ViewNomenclatureSection;
