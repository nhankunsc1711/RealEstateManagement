import { CreateUserResponse } from "../../Features/User/Responses/CreateUserResponse";
import { LoginResponse } from "../../Features/User/Responses/LoginResponse";
import { GetUserResponse } from "../../Features/User/Responses/GetUserResponse";
import { GetAllUserResponse } from "../../Features/User/Responses/GetAllUserResponse";
import { DeleteUserResponse } from "../../Features/User/Responses/DeleteUserResponse";
import { UpdateUserResponse } from "../../Features/User/Responses/UpdateUserResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface IUserService {
    registerAccount(data: any, roleName: string): Promise<CreateUserResponse|CoreException>;
    login(data: any): Promise<LoginResponse|CoreException>;
    getUserById(userId: string): Promise<GetUserResponse|CoreException>;
    getAllUser(userData: any): Promise<GetAllUserResponse|CoreException>;
    deleteUserById(userId: string): Promise<DeleteUserResponse|CoreException>;
    updateUserById (userId: string, updateData: any): Promise<UpdateUserResponse|CoreException>;
    changePassword(userId: string, updatePassworddata: any): Promise<LoginResponse|CoreException>;
    getNewToken(refreshToken: any): any;
}