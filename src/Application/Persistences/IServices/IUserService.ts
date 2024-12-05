import { CreateUserResponse } from "../../Features/User/Responses/CreateUserResponse";
import { LoginResponse } from "../../Features/User/Responses/LoginResponse";
import { GetUserResponse } from "../../Features/User/Responses/GetUserResponse";
import { DeleteUserResponse } from "../../Features/User/Responses/DeleteUserResponse";
import { UpdateUserResponse } from "../../Features/User/Responses/UpdateUserResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface IUserService {
    registerAccount(data: any, roleName: string): Promise<CreateUserResponse|CoreException>;
    login(data: any): Promise<LoginResponse|CoreException>;
    getUserById(userId: any): Promise<GetUserResponse|CoreException>;
    deleteUserById(userId: any): Promise<DeleteUserResponse|CoreException>;
    updateUserById (userId: any, updateData: any): Promise<UpdateUserResponse|CoreException>;
    changePassword(userId: any, data: any): Promise<LoginResponse|CoreException>;
    getNewToken(refreshToken: any): any;
}