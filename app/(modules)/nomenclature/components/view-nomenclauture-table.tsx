import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Restriction } from "../interfaces/restriction";


interface Props {
    restrictions: Restriction[]
}

const RestrictionTable = ({
    restrictions,
}: Props) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead >#</TableHead>
                    <TableHead >NOMBRE</TableHead>
                    <TableHead >TIPO DE CAMPAÑA</TableHead>
                    <TableHead >DEPENDENCIAS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="w-full">
                {restrictions.map((restriction, index) => (
                    <TableRow key={restriction.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{restriction.character}</TableCell>
                        <TableCell>{restriction.isActive}</TableCell>
                        <TableCell>{restriction.ruleType}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default RestrictionTable;