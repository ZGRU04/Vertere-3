import { WorkingHourRepository } from "../../data/repository/WorkingHourRepository";

export const fetchWorkingHourByIdUseCase = async (id: string) => {
    return WorkingHourRepository.fetchById(id);
};