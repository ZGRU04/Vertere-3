import axios, { AxiosRequestConfig } from 'axios';

export class BaseCrudService<T> {
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private sourcePath: string; 

  constructor(sourcePath: string) {
    this.sourcePath = sourcePath;
    console.log(this.baseUrl);
  }

  async getAll(params?: AxiosRequestConfig): Promise<T[]> {
    const urlPath = `${this.baseUrl}/${this.sourcePath}`
    const response = await axios.get<T[]>(urlPath, params);
    return response.data;
  }

  async getById(id: string): Promise<T> {
    const urlPath = `${this.baseUrl}/${this.sourcePath}/${id}`
    const response = await axios.get<T>(urlPath);
    return response.data;
  }

  async create(item: T): Promise<T> {
    const urlPath = `${this.baseUrl}/${this.sourcePath}`
    const response = await axios.post<T>(urlPath, item);
    return response.data;
  }

  async update(id: string, item: T): Promise<T> {
    const urlPath = `${this.baseUrl}/${this.sourcePath}/${id}`
    const response = await axios.put<T>(urlPath, item);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    const urlPath = `${this.baseUrl}/${this.sourcePath}/${id}`
    await axios.delete(urlPath);
  }
}