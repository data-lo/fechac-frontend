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

const RestrictionTable = ({ restrictions }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>CARÁCTER</TableHead>
                    <TableHead>ESTATUS</TableHead>
                    <TableHead>ESTATUS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restrictions.map((restriction, index) => (
                    <TableRow key={restriction._id}>
                        <TableCell>{index + 1}</TableCell>

                        {/* Carácter con fondo gris y bold */}
                        <TableCell>
                            <span className="bg-gray-200 font-bold w-10 py-1 inline-flex items-center justify-center rounded">
                                {restriction.character}
                            </span>
                        </TableCell>

                        {/* Círculo verde si está activo */}
                        <TableCell>
                            <span
                                className={`h-3 w-3 rounded-full inline-block ${
                                    restriction.isActive ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default RestrictionTable;