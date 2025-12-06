import { getDag } from "./actions/get-dag";
import { getToken } from "./actions/get-token";
import AirflowSection from "./airflow-section";
import { DagRun } from "./interfaces/dag-run-interface";

const Page = async () => {

    const response = await getToken();

    const dags: DagRun[] = await getDag(response.access_token)

    console.log(dags)

    return (
        <div className="h-screen">
            <AirflowSection dags={dags} />
        </div>
    );


}


export default Page;