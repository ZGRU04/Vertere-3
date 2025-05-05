export class Auth {
    data?: any;
    token?: any;
    device?: any;
    branch_office?: any;

    constructor(data: any, token: any, device: any, branch_office: any) {
        this.data = data;
        this.token = token;
        this.device = device;
        this.branch_office = branch_office;
    }
}
