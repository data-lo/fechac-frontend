import { getDag } from "./actions/get-dag";
import { getToken } from "./actions/get-token";

const Page = async () => {

    const response = await getToken();

    const dags = await getDag(response.access_token)

    console.log(dags)

    return( 
        <>
        
        </>
    );


}


export default Page;