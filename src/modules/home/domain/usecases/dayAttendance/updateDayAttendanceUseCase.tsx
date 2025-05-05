import { DayAttendance } from "../../../data/model/DayAttendance.model";
import { DayAttendanceRepository } from "../../../data/repository/DayAttendanceRepository";

export const updateDayAttendanceUseCase = async (id: string, dayAttendance: Partial<DayAttendance>) => {
    return DayAttendanceRepository.savedWithString(id, dayAttendance);
};