import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AbbreviationDocument } from "../models/abbreviation-document";


interface Props {
    data: AbbreviationDocument[]
}

const AbbreviationTable = ({
    data
}: Props) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead >#</TableHead>
                    <TableHead >Nombre</TableHead>
                    <TableHead >Abreviación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="w-full">
                {data.map((abbreviation, index) => (
                    <TableRow key={abbreviation._id.toString()}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{abbreviation.name}</TableCell>
                        <TableCell>{abbreviation.abbreviation}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default AbbreviationTable;