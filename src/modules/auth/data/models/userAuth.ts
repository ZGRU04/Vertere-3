import { User } from "./user";

export interface UserAuth {
    user?: User;
    branch_office?: any;
    token: string
}