import { BaseCrudService } from "../../../utils/BaseCrudService";
import { WorkingHour } from "../data/model/WorkingHours.model";

export class WorkingHourService extends BaseCrudService<WorkingHour> {
	constructor() {
		super('working-hour');
	}
}