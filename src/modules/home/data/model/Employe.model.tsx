import { People } from "./People.model";

export interface Employe {
    id: number,
    branch_office_id?: number,
    people_id?: number,
    state?: boolean,
    is_disabled?: boolean,
    type_employee?: number,
    created_at?: Date,
    updated_at?: Date,
    date_admission?: string,
    date_discharge?: string,
    people?: People,
    region_id?: number,
}
