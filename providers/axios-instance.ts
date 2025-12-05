// // src/api/airflow.ts
// import axios from "axios";

// const airflowApi = axios.create({
//     baseURL: process.env.AIRFLOW,
// });

// // Interceptor para anexar token a cada request
// airflowApi.interceptors.request.use(
//     (config) => {
//         const token = globalThis.airflowToken; // o desde un store
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// airflowApi.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401) {
//             try {
//                 console.log("Token expirado, refrescando...");

//                 const newToken = await refreshToken();

//                 globalThis.airflowToken = newToken.token;

//                 // Reintentar la petición original con el nuevo token
//                 error.config.headers.Authorization = `Bearer ${newToken.token}`;
//                 return airflowApi.request(error.config);

//             } catch (refreshError) {
//                 console.error("No se pudo refrescar el token");
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default airflowApi;
