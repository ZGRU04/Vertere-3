import { Auth } from "../data/models/auth.model";
import { Login } from "../data/models/login.model";
import { TemporalAuth } from "../../temporalAuthContent/data/models/temporalAuth";
import { ToastService } from "../../shared/services/Toast/ToastService";
import axiosInstance from "../../../core/config/axiosConfig";
import { baseUrl } from "../../../core/config/config";

const sourcePath: string = 'auth';

export const authService = {
    auth: async (data: Login): Promise<any> => {
        const urlPath = `${baseUrl}/${sourcePath}`;
        const response = await axiosInstance.post<Auth>(urlPath, data);
        return response.data;
    },

    temporalAuth: async (data: {doc_identity: string}): Promise<TemporalAuth | null> => {
        try {
            const urlPath = `${baseUrl}/${sourcePath}/enployedAuth`;
            const response = await axiosInstance.post<Auth>(urlPath, data);
            return response;
        } catch (error: any) {
            let title = error.message;
            let message = error?.response?.data.message;
            console.log(error.message)
            if (error.message === 'Network Error') {
                title = 'Error de conexión a internet';
                message = 'No se puede conectar al servidor. Verifica tu conexión a Internet.';
            }

            if (error.message === 'Request failed with status code 404') {
                title = error?.response?.data.message;
                message = 'Consulta con el administrador si existe el empleado.';
            }
            
            ToastService.errorToast(title, message);
            return null
        } 
    }
}