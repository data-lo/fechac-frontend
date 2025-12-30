import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AbbreviationDocument } from "../models/abbreviation-document";
import ContextMenu from "@/components/context-menu";
import Modal from "@/components/modal";
import UpdateAbbreviationForm from "../update/update-abbreviation-form";
import DeleteAbbreviationButton from "../delete/components/delete-abbreviation-button";


interface Props {
    data: AbbreviationDocument[]
}

const AbbreviationTable = ({
    data
}: Props) => {

    return (
        <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-0 w-full">NOMBRE</TableHead>
                    <TableHead className="w-24">ABREVIACIÓN</TableHead>
                    <TableHead className="w-24"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((abbreviation, index) => (
                    <TableRow key={abbreviation._id.toString()}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{abbreviation.name}</TableCell>
                        <TableCell>{abbreviation.abbreviation}</TableCell>
                        <TableCell>
                            <ContextMenu>
                                <Modal
                                    dialogTitle="Actualizar Carácter"
                                    dialogTrigger={"Editar"}
                                    variant={'ghost'}
                                >
                                    <UpdateAbbreviationForm
                                        data={abbreviation}
                                    />
                                </Modal>


                                <DeleteAbbreviationButton
                                    _id={abbreviation._id}
                                />
                            </ContextMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default AbbreviationTable;