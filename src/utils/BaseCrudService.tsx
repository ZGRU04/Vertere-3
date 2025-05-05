import axiosInstance from "../core/config/axiosConfig";

export class BaseCrudService<T> {
	sourcePath: string; 

	constructor(sourcePath: string) {
		this.sourcePath = sourcePath;
	}

	getAll = async (filters?: Record<string, any>): Promise<T[]> => {
        const response = await axiosInstance.get<T[]>(this.sourcePath, { params: filters });
        return response.data;
    };

    getById = async (id: string | number): Promise<T> => {
        const response = await axiosInstance.get<T>(`${this.sourcePath}/${id}`);
        return response.data;
    };

    create = async (item: T): Promise<T> => {
        const response = await axiosInstance.post<T>(this.sourcePath, item);
        return response.data;
    };

    update = async (id: string | number, item: T): Promise<T> => {
        const response = await axiosInstance.put<T>(`${this.sourcePath}/${id}`, item);
        return response.data;
    };

    delete = async (id: string | number): Promise<void> => {
        await axiosInstance.delete(`${this.sourcePath}/${id}`);
    };
}

// export class BaseCrudService<T> {
//     sourcePath: string;
//     baseUrl: string = process.env.EXPO_PUBLIC_API_URL;

//     constructor(sourcePath: string) {
//         this.sourcePath = sourcePath;
//     }

//     private async handleRequest<R>(
//         url: string,
//         options: RequestInit = {}
//     ): Promise<R> {
//         try {
//             const response = await fetch(`${this.baseUrl}/${url}`, {
//                 headers: { "Content-Type": "application/json" },
//                 ...options,
//             });

//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error(`Error en ${options.method || "GET"} ${url}:`, error);
//             throw error;
//         }
//     }

//     async getAll(filters?: Record<string, any>): Promise<T[]> {
//         const queryString = filters ? `?${new URLSearchParams(filters).toString()}` : "";
//         return this.handleRequest<T[]>(`${this.sourcePath}${queryString}`);
//     }

//     async getById(id: string | number): Promise<T> {
//         return this.handleRequest<T>(`${this.sourcePath}/${id}`);
//     }

//     async create(item: T): Promise<T> {
//         return this.handleRequest<T>(this.sourcePath, {
//             method: "POST",
//             body: JSON.stringify(item),
//         });
//     }

//     async update(id: string | number, item: T): Promise<T> {
//         return this.handleRequest<T>(`${this.sourcePath}/${id}`, {
//             method: "PUT",
//             body: JSON.stringify(item),
//         });
//     }

//     async delete(id: string | number): Promise<void> {
//         await this.handleRequest<void>(`${this.sourcePath}/${id}`, {
//             method: "DELETE",
//         });
//     }
// }