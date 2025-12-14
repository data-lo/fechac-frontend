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

// 4. Tipos/Modelos
import { CriterionEntity } from "../../models/criterion-entity";

interface Props {
    data: CriterionEntity[];
    currentIndex: number;
}

const CriterionTable = ({ data, currentIndex }: Props) => {
    const router = useRouter();

    const handleEdit = (criterionId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/criteria/${criterionId}/update`);
    };

    return (
        <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead className="max-w-[340px]">NOMBRE DEL ARCHIVO</TableHead>
                    <TableHead className="w-[240px]">DEPARTAMENTO</TableHead>
                    <TableHead className="w-[240px]">CÓDIGO</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((criterion, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {currentIndex + index + 1}
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
                            {(criterion.quality_system_code ?? "SIN CÓDIGO").toUpperCase()}
                        </TableCell>

                        <TableCell>
                            <ActionButton
                                iconName="FileSliders"
                                className="w-min"
                                variant="ghost"
                                onClick={handleEdit(criterion._id.toString())}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CriterionTable;