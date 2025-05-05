import { DayAttendanceStatusEnum } from "../../domain/enums/dayAttendanceStatus.enum";
import { WorkingHour } from "./WorkingHours.model";

export class DayAttendance {
	id?: string;
	employee_id?: number;
	reason_id?: number;
	preview_reason_id?: number;
	work_shift_id?: number;
	preview_work_shift_id?: number;
	form_month_id?: string;
	branch_office_id?: number;
	date?: string;
	is_holiday?: boolean;
	day?: number;
	time_ini?: string;
	time_end?: string;
	preview_time_ini?: string;
	preview_time_end?: string;
	preview_total_hours?: number;
	total_hours?: number;
	is_available?: boolean;
	working_hours: WorkingHour[];
	status?: DayAttendanceStatusEnum;
	created_at?: Date;
	updated_at?: Date;
	message?: string;

	constructor(data: Partial<DayAttendance> = {}) {
		this.id = data.id;
		this.employee_id = data.employee_id;
		this.reason_id = data.reason_id;
		this.preview_reason_id = data.preview_reason_id;
		this.work_shift_id = data.work_shift_id;
		this.preview_work_shift_id = data.preview_work_shift_id;
		this.form_month_id = data.form_month_id;
		this.branch_office_id = data.branch_office_id;
		this.date = data.date;
		this.is_holiday = data.is_holiday;
		this.day = data.day;
		this.time_ini = data.time_ini;
		this.time_end = data.time_end;
		this.preview_time_ini = data.preview_time_ini;
		this.preview_time_end = data.preview_time_end;
		this.preview_total_hours = data.preview_total_hours;
		this.total_hours = data.total_hours;
		this.is_available = data.is_available;
		this.working_hours = data.working_hours || [];
		this.status = data.status;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}