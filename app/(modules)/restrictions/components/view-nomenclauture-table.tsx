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
import StatusNomenclatureForm from "./status-nomenclature/status-nomenclature-form";

// 4. Modelos locales
import { RestrictionDocument } from "../models/restriction-document";



interface Props {
    restrictions: RestrictionDocument[]
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
                    <TableRow key={restriction._id.toString()}>
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
                            <ContextMenu>
                                <ModalComponent
                                    dialogTitle={"Editar"}
                                    dialogDescription={""}
                                    dialogTrigger={"Editar"}
                                    variant={'ghost'}
                                    children={
                                        <div className="flex justify-end">
                                            <ActionButton
                                                title="Guardar"
                                                iconName={'Trash'}
                                            />
                                        </div>
                                    }
                                />

                                <ModalComponent
                                    dialogTitle={"Activar / Desactivar"}
                                    dialogDescription={"Aquí puedes activar la regla para que se aplique, o desactivarla si no deseas que tenga efecto."}
                                    dialogTrigger={restriction.isActive ? 'Desactivar' : 'Activar'}
                                    variant={'ghost'}
                                    children={
                                        <StatusNomenclatureForm
                                            id={restriction._id.toString()}
                                            isActive={restriction.isActive}
                                        />
                                    }
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