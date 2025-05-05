import { WorkingHour } from "../../data/model/WorkingHours.model";
import { WorkingHourRepository } from "../../data/repository/WorkingHourRepository";

export const updateWorkingHourUseCase = async (id: number, workingHourData: WorkingHour) => {
    return WorkingHourRepository.updateWorkingHour(id, workingHourData);
};