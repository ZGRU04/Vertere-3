import Constants from "expo-constants";
import axios, { AxiosInstance } from "axios";
import { getData } from "../../utils/StorageService";
import { ToastService } from "../../modules/shared/services/Toast/ToastService";
import { baseUrl } from "./config";

//const baseUrl: string = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || 'patito.com'
//const baseUrl: string = 'https://masser-dev.pricer-pro.online/vertere/api';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const temporalUserDetail = await getData('temporalUserDetail') as { employe: any, token: string };
            if (temporalUserDetail?.token) {
                config.headers.Authorization = `Bearer ${temporalUserDetail.token}`;
            }
        } catch (error) {
            console.error("Error obteniendo el token:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
      if (response.headers["content-type"]?.includes("application/json")) {
          return response.data;
      } else {
          ToastService.errorToast('Error', 'Respuesta inválida del servidor.');
          return Promise.reject(new Error("La respuesta del servidor no es JSON"));
      }
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorMessage =
          status === 400 ? "Solicitud incorrecta.":
          status === 401 ? "No autorizado. Inicia sesión nuevamente.":
          status === 403 ? "Acceso prohibido.":
          status === 404 ? "Recurso no encontrado.": 
          status === 500 ? "Error del servidor. Inténtalo más tarde.":
          "Error desconocido.";

          ToastService.errorToast('Error', errorMessage);

          console.log("AXIOS ERROR:", {
              message: error.message,
              status,
              response: error.response?.data,
          });
      } else {
        ToastService.errorToast('Error', 'Ocurrió un problema inesperado.');
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;