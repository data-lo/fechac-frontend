"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import DagRun from "@/interfaces/workflows/dag-run";
import { CircleArrowRight, CirclePlay } from "lucide-react";

interface Props {
    data: DagRun[];
}

const formatDate = (dateString?: string | null) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleString("es-MX", {
        day: "numeric",
        month: "long",
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
                    <TableHead className="w-[40px] text-center"></TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type of Activation</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((dag, index) => (
                    <TableRow className="text-xs" key={dag.dag_run_id}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {index + 1}
                        </TableCell>

                        <TableCell>{formatDate(dag.start_date)}</TableCell>

                        <TableCell>{formatDate(dag.end_date)}</TableCell>

                        <TableCell>

                            <Badge
                                variant="outline"
                                className="gap-1"
                            >
                                <CircleArrowRight className="w-3 h-3" />
                                {translateStatus(dag.state)}
                            </Badge>
                        </TableCell>

                        <TableCell>
                            <Badge
                                variant="outline"
                                className="gap-1"
                            >
                                <CirclePlay className="w-3 h-3" />
                                {dag.run_type.toUpperCase()}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DagTable;

