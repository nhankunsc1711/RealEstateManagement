export class CreateUserRequest {
    public username: string;
    public password: string;
    public fullName: string;
    public address: string;
    public phoneNumber: string;
    public email: string
    public roleName: string;


    constructor(username: string, password: string, fullName: string, address: string, phoneNumber: string, email: string , roleName: string) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.roleName = roleName;
    }
}