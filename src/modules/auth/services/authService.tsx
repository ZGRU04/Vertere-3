import { BaseCrudService } from "../../../utils/BaseCrudService";
import { Auth } from "../data/models/auth.model";

export class AuthService extends BaseCrudService<Auth> {
    constructor() {
        super('auth')
    }
}