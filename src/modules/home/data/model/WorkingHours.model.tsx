import { WorkingHourStateEnum } from "../../domain/enums/workingHour.enum";

export interface WorkingHour {
    id?: number,
    init_hour?: string,
    finish_hour?: string | null,
    total_hours?: number,
    state?: WorkingHourStateEnum,
    day_attendance_id?: string, 
    deleted_at?: Date,
    created_at?: Date,
    updated_at?: Date
}