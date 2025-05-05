import { WorkingHour } from "../../data/model/WorkingHours.model";
import { WorkingHourRepository } from "../../data/repository/WorkingHourRepository";

export const createWorkingHourUseCase = async (workingHourdata: WorkingHour) => {
    return WorkingHourRepository.createWorkingHour(workingHourdata);
};

