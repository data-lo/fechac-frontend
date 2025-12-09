"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DagRun } from "../view/interfaces/dag-run-interface";

interface Props {
    data: DagRun[];
}

const formatDate = (dateString?: string | null) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const translateStatus = (state: string) => {
    const map: Record<string, string> = {
        success: "EXITOSO",
        failed: "FALLIDO",
        running: "EN EJECUCIÓN",
        queued: "EN COLA",
        up_for_retry: "PENDIENTE DE REINTENTO",
        up_for_reschedule: "PENDIENTE DE REPROGRAMACIÓN",
        skipped: "OMITIDO",
        no_status: "SIN ESTADO",
    };

    return map[state] ?? state;
};

const DagTable = ({ data }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[40px] text-center">#</TableHead>
                    <TableHead>LOTE</TableHead>
                    <TableHead>INICIO</TableHead>
                    <TableHead>FIN</TableHead>
                    <TableHead>ESTATUS</TableHead>
                    <TableHead>TIPO DE ACTIVACIÓN</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((dag, index) => (
                    <TableRow key={dag.dag_run_id}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {index + 1}
                        </TableCell>

                        <TableCell className="max-w-[200px] truncate">
                            {dag.dag_versions?.[0]?.version_number?.toString() ?? "—"}
                        </TableCell>

                        <TableCell>{formatDate(dag.start_date)}</TableCell>

                        <TableCell>{formatDate(dag.end_date)}</TableCell>

                        <TableCell>
                            <span
                                className={`
                                    px-2 py-1 rounded text-xs font-semibold
                                    ${dag.state === "success" ? "bg-green-100 text-green-700" : ""}
                                    ${dag.state === "failed" ? "bg-red-100 text-red-700" : ""}
                                    ${dag.state === "running" ? "bg-blue-100 text-blue-700" : ""}
                                    ${dag.state === "queued" ? "bg-yellow-100 text-yellow-700" : ""}
                                `}
                            >
                                {translateStatus(dag.state)}
                            </span>
                        </TableCell>

                        <TableCell>
                            {dag.run_type.toUpperCase()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DagTable;
