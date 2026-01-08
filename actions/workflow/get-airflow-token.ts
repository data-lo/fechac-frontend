import axios, { AxiosError } from "axios";
import { GetTokenInterface } from "../interfaces/get-token-response";

export default async function getAirflowToken(): Promise<string> {
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

    const axiosError = error as AxiosError

    console.error("Error obteniendo token:", error);

    if (!axiosError.response) {
      throw new Error("El servicio de Airflow no está disponible en este momento.");
    }

    if (axiosError.response.status === 401) {
      throw new Error("Las credenciales de Airflow no son válidas o han expirado.");
    }

    throw new Error("Ocurrió un error inesperado al comunicarse con Airflow.");
  }
}
