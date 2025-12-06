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
import { DagRun } from "../interfaces/dag-run-interface";
import DeleteCriterionButton from "../../criteria/delete/components/delete-criterion-button";


interface Props {
    data: DagRun[];
}

const DagTable = ({ data }: Props) => {
    const router = useRouter();

    const handleEdit = (criterionId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>NOMBRE DEL ARCHIVO</TableHead>
                    <TableHead>DEPARTAMENTO</TableHead>
                    <TableHead>CÓDIGO</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((dag, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {index + 1}
                        </TableCell>
                        <TableCell className="min-w-0">
                            <div className="text-sm line-clamp-2 leading-tight pr-4">
                                {dag.dag_id}
                            </div>
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                            {dag.dag_id}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap overflow-hidden">
                            {String(dag.dag_id).toUpperCase()}
                        </TableCell>
                        <TableCell className="text-right">
                            <ContextMenu>
                                <ActionButton
                                    title="Editar"
                                    className="w-auto"
                                    variant={"ghost"}
                                    onClick={handleEdit(String(dag.dag_id))}
                                />

                                <DeleteCriterionButton
                                    _id={dag.dag_id}
                                />
                            </ContextMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DagTable;