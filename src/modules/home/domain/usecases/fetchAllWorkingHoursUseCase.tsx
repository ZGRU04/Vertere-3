import { WorkingHourRepository } from "../../data/repository/WorkingHourRepository";

export const fetchAllWorkingHoursUseCase = async (filters?: Record<string, any>) => {
    return await WorkingHourRepository.fetchAll(filters);
};