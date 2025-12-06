import DagTable from "./components/dag-table";
import { DagRun } from "./interfaces/dag-run-interface";

interface Props {
    dags: DagRun[];
}

const AirflowSection = ({
    dags
}: Props) => {


    return (
        <div className="px-6 py-4 flex flex-col h-screen gap-6 relative overflow-auto pt-16">
            <DagTable data={dags} />
        </div>
    );
}

export default AirflowSection