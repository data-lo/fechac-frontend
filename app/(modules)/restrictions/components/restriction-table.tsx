// 1. Librerías externas

// 2. Componentes globales
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ModalComponent from "@/components/modal";
import ContextMenu from "@/components/context-menu";

// 3. Componentes locales del módulo


// 4. Modelos locales

import ToggleRestrictionStatus from "./toggle-restriction-status";
import UpdateRestrictionForm from "../update/update-restriction-form";
import DeleteRestrictionButton from "../delete/delete-restriction-button";
import { RestrictionDocument } from "@/models/restrictions/restriction-document";


interface Props {
    restrictions: RestrictionDocument[]
}

const RestrictionTable = ({ restrictions }: Props) => {

    return (
        <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-center"></TableHead>
                    <TableHead className="min-w-0 w-full" >Character</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-24"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restrictions.map((restriction, index) => (
                    <TableRow key={restriction._id.toString()}>
                        <TableCell className="text-center text-gray-500 font-medium">{index + 1}</TableCell>

                        <TableCell>
                                {restriction.character}
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
                                >
                                    <UpdateRestrictionForm data={restriction} />
                                </ModalComponent>

                                <ToggleRestrictionStatus
                                    _id={restriction._id.toString()}
                                    status={restriction.status}
                                />

                                <DeleteRestrictionButton
                                    _id={restriction._id.toString()}
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