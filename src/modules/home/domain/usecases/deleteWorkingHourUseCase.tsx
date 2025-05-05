import { WorkingHourRepository } from "../../data/repository/WorkingHourRepository";

export const deleteWorkingHourUseCase = async (id: string) => {
    return WorkingHourRepository.deleteWorkingHour(id);
};