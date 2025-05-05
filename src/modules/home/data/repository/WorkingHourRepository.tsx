import { WorkingHourService } from "../../service/WorkingHourService";

const workingHourService = new WorkingHourService();

export const WorkingHourRepository = {
    fetchAll(filters?: Record<string, any>) {
        return workingHourService.getAll(filters);
    },

    fetchById(id: string) {
        return workingHourService.getById(id);
    },

    createWorkingHour(data: any) {
        return workingHourService.create(data);
    },

    updateWorkingHour(id: number, data: any) {
        return workingHourService.update(id, data);
    },

    deleteWorkingHour(id: string) {
        return workingHourService.delete(id);
    },
};