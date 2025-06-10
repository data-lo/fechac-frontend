import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Restriction } from "../interfaces/restriction";
import ButtonComponent from "@/components/button-component";
import ModalComponent from "@/components/modal-component";
import { Trash } from "lucide-react";
import DropdownMenuComponent from "@/components/dropdown-menu-component";
import StatusNomenclatureForm from "./status-nomenclature/status-nomenclature-form";


interface Props {
    restrictions: Restriction[]
}

const RestrictionTable = ({ restrictions }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>CARÁCTER</TableHead>
                    <TableHead>ESTATUS</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restrictions.map((restriction, index) => (
                    <TableRow key={restriction._id}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>
                            <span className="bg-gray-200 font-bold w-10 py-1 inline-flex items-center justify-center rounded">
                                {restriction.character}
                            </span>
                        </TableCell>

                        <TableCell>
                            <span
                                className={`h-3 w-3 rounded-full inline-block ${restriction.isActive ? "bg-green-500" : "bg-red-500"
                                    }`}
                            ></span>
                        </TableCell>

                        <TableCell>
                            <DropdownMenuComponent>
                                <ModalComponent
                                    dialogTitle={"Editar"}
                                    dialogDescription={""}
                                    dialogTrigger={"Editar"}
                                    variant={'ghost'}
                                    sizeButton={'w-auto'}
                                    children={
                                        <div className="flex justify-end">
                                            <ButtonComponent
                                                title="Guardar"
                                                icon={Trash}
                                            />
                                        </div>
                                    }
                                />

                                <ModalComponent
                                    dialogTitle={"Activar / Desactivar"}
                                    dialogDescription={"Aquí puedes activar la regla para que se aplique, o desactivarla si no deseas que tenga efecto."}
                                    dialogTrigger={restriction.isActive ? 'Desactivar' : 'Activar'}
                                    variant={'ghost'}
                                    sizeButton={'w-auto'}
                                    children={
                                        <StatusNomenclatureForm
                                            id={restriction._id}
                                            isActive={restriction.isActive}
                                        />
                                    }
                                />
                            </DropdownMenuComponent>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
};

export default RestrictionTable;