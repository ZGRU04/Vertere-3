import { DayAttendanceRepository } from "../../../data/repository/DayAttendanceRepository"

export const fetchDayAttendanceForEmployeUseCase = async (filters?: Record<string, any>) => {
    return await DayAttendanceRepository.getDayAttendanceByEmploye(filters);
}