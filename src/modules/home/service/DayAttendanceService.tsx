import axiosInstance from "../../../core/config/axiosConfig";
import { BaseCrudService } from "../../../utils/BaseCrudService";
import { DayAttendance } from "../data/model/DayAttendance.model";

export class DayAttendanceService extends BaseCrudService<DayAttendance>{
    constructor() {
		super('day_attendance');
	}

    async getSayAttendanceByEmploye(filters?: Record<string, any>): Promise<DayAttendance> {
        const urlPath = `${this.sourcePath}/employe`;
        const response = await axiosInstance.get<DayAttendance>(urlPath, { params: filters });
        return response as any;
    }

    async savedWithString(id: string, item: DayAttendance):Promise<{data: DayAttendance, message?: string}> {
        const response: any = await axiosInstance.put<DayAttendance>(`${this.sourcePath}/${id}`, item);
        return response.data;
    }
}