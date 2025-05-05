import axiosInstance from "../../../core/config/axiosConfig";

const sourcePath: string = 'branch-offices';


export const brandService = {
    getById: async (id: any): Promise<any> => {
        const urlPath = `/${sourcePath}/office/${id}`
        const response = await axiosInstance.get(urlPath);
        return response.data;
    }
}


// import { getData } from '../../../utils/StorageService';

// const baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
// const sourcePath: string = 'branch-offices';

// export const brandService = {
//     getById: async (id: string | number): Promise<any> => {
//         try {
//             const token = await getData('token');
//             const urlPath = `/${sourcePath}/office/${id}`;
//             const response = await fetch(urlPath, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error("Error en getById:", error);
//             throw error;
//         }
//     }
// };