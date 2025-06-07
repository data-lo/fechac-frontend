import { Fragment } from "react";

import EmptyMessage from "@/components/empty-message";
import Modal from "@/components/modal";
import { Plus } from "lucide-react";
import AbbreviationTable from "./components/view-abbreviation-table";

const ViewAbbreviationSection = () => {

    let abbreviations = [];

    return (
        <Fragment>
            <h1 className="font-bold text-xl">Abreviaciones</h1>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
                <Modal
                    dialogTitle={"Abreviación"}
                    dialogDescription={"Aquí puedes crear nuevas abreviaciones para los consejos del estado."}
                    icon={Plus}
                    dialogTrigger={"Crear Abreviación"}
                    children={undefined}
                    sizeButton="sm:w-[338px] w-full"
                />
            </div>
            {abbreviations.length > 0 ? (
                <AbbreviationTable abbreviations={[]} />
            ) : (
                <EmptyMessage text="Aún no se han creado abreviaciones." />
            )}

        </Fragment>
    )
}

export default ViewAbbreviationSection;
