'use client'

// 1. React y hooks de Next.js
import { useRouter } from "next/navigation";

// 2. Componentes UI
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// 3. Componentes propios
import ActionButton from "@/components/action-button";
import ContextMenu from "@/components/context-menu";

// 4. Tipos/Modelos
import { CriterionDocument } from "../models/criterion-entity";
import DeleteCriterionButton from "../delete/components/delete-criterion-button";

interface Props {
    data: CriterionDocument[];
}

const CriterionTable = ({ data }: Props) => {
    const router = useRouter();

    const handleEdit = (criterionId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/criteria/${criterionId}/update`);
    };

    return (
        <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-0 w-full">NOMBRE DEL ARCHIVO</TableHead>
                    <TableHead className="w-36 whitespace-nowrap">DEPARTAMENTO</TableHead>
                    <TableHead className="w-44 whitespace-nowrap">CÓDIGO</TableHead>
                    <TableHead className="w-24"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((criterion, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {index + 1}
                        </TableCell>
                        <TableCell className="min-w-0">
                            <div className="text-sm line-clamp-2 leading-tight pr-4">
                                {criterion.file_name}
                            </div>
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                            {criterion.department}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap overflow-hidden">
                            {String(criterion.form_code).toUpperCase()}
                        </TableCell>
                        <TableCell className="text-right">
                            <ContextMenu>
                                <ActionButton
                                    title="Editar"
                                    className="w-auto"
                                    variant={"ghost"}
                                    onClick={handleEdit(String(criterion._id))}
                                />

                                <DeleteCriterionButton
                                    _id={criterion._id}
                                />
                            </ContextMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CriterionTable;