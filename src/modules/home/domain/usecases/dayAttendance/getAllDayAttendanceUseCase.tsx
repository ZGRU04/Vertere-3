import { DayAttendanceRepository } from "../../../data/repository/DayAttendanceRepository";

export const getAllDayAttendanceUSeCase = async (filters?: Record<string, any>) => {
    return await DayAttendanceRepository.fetchAll(filters);
}