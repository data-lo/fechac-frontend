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
import { CircleArrowRight, CirclePlay, ListRestart } from "lucide-react";

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
        success: "Exitoso",
        failed: "Fallido",
        running: "En Ejecución",
        queued: "En Cola",
        up_for_retry: "Pendiente de Reintento",
        up_for_reschedule: "Pendiente de Repogramación",
        skipped: "Omitido",
        no_status: "Sin Estado",
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
                    <TableRow key={dag.dag_run_id}>
                        <TableCell className="text-center text-gray-500 font-medium">
                            {index + 1}
                        </TableCell>

                        <TableCell className="text-xs">{formatDate(dag.start_date).toUpperCase()}</TableCell>

                        <TableCell className="text-xs">{formatDate(dag.end_date).toUpperCase()}</TableCell>

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
                                {dag.run_type.charAt(0).toUpperCase() + dag.run_type.slice(1)}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DagTable;

