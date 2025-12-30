import axios from "axios";
import { GetTokenInterface } from "../interfaces/get-token-response";

export async function getToken(): Promise<string> {
  try {
    const response = await axios.post<GetTokenInterface>(
      `${process.env.AIRFLOW_API}/auth/token`,
      {
        username: process.env.AIRFLOW_USERNAME,
        password: process.env.AIRFLOW_PASSWORD,
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error obteniendo token:", error);
    throw error;
  }
}
