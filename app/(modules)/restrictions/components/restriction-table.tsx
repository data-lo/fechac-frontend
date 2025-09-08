// 1. Librerías externas
import { Trash } from "lucide-react";

// 2. Componentes globales
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionButton from "@/components/action-button";
import ModalComponent from "@/components/modal";
import ContextMenu from "@/components/context-menu";

// 3. Componentes locales del módulo


// 4. Modelos locales
import { RestrictionDocument } from "../models/restriction-document";
import ToggleRestrictionStatus from "./toggle-restriction-status";
import UpdateRestrictionForm from "../update/update-restriction-form";


interface Props {
    restrictions: RestrictionDocument[]
}

const RestrictionTable = ({ restrictions }: Props) => {

    return (
                <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-0 w-full" >CARÁCTER</TableHead>
                    <TableHead className="w-24">ESTATUS</TableHead>
                    <TableHead className="w-24"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restrictions.map((restriction, index) => (
                    <TableRow key={restriction._id.toString()}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>
                            <span className="bg-gray-200 font-bold w-10 py-1 inline-flex items-center justify-center rounded">
                                {restriction.character}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span
                                className={`h-3 w-3 rounded-full inline-block ${restriction.status ? "bg-green-500" : "bg-red-500"
                                    }`}
                            ></span>
                        </TableCell>

                        <TableCell>
                            <ContextMenu>
                                <ModalComponent
                                    dialogTitle="Actualizar Carácter"
                                    dialogTrigger={"Editar"}
                                    variant={'ghost'}
                                    children={
                                       <UpdateRestrictionForm data={restriction}/>
                                    }
                                />

                                <ToggleRestrictionStatus
                                    _id={restriction._id.toString()}
                                    status={restriction.status}
                                />
                            </ContextMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
};

export default RestrictionTable;