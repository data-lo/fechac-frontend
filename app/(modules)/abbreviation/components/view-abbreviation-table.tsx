import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Abbreviation } from "../interfaces/abbreviation";


interface Props {
    abbreviations: Abbreviation[];
}

const AbbreviationTable = ({
    abbreviations
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
                {abbreviations.map((abbreviation, index) => (
                    <TableRow key={abbreviation.id}>
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