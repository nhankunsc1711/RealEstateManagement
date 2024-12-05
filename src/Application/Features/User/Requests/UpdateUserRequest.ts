export class UpdateUserRequest {
    public _id: string;
    public username: string;
    public password: string;
    public fullName: string;
    public address: string;
    public phoneNumber: string;
    public email: string;
    public imagePath: string;
    public roleName: string;


    constructor(_id: string, username: string, password: string, fullName: string, address: string, phoneNumber: string, email: string, imagePath: string, roleName: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.imagePath = imagePath;
        this.roleName = roleName;
    }
}