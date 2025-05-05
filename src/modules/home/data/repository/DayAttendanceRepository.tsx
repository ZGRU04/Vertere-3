import { DayAttendanceService } from "../../service/DayAttendanceService";

const dayAttendanceService = new DayAttendanceService();

export const DayAttendanceRepository = {
    async fetchAll(filters?: Record<string, any>) {
        return await dayAttendanceService.getAll(filters);
    },

    async fetchById(id: string) {
        return await dayAttendanceService.getById(id);
    },

    async createDayAttendance(data: any) {
        return await dayAttendanceService.create(data);
    },

    async updateDayAttendance(id: string, data: any) {
        return await dayAttendanceService.update(id, data);
    },

    async deleteDayAttendance(id: string) {
        return await dayAttendanceService.delete(id);
    },

    async getDayAttendanceByEmploye(filters?: Record<string, any>) {
        return await dayAttendanceService.getSayAttendanceByEmploye(filters);
    },

    async savedWithString(id: string, data: any) {
        return await dayAttendanceService.savedWithString(id, data);
    }
};