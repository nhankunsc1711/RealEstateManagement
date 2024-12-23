import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import { UserWithBase } from "../../../Domain/Models/UserAccount";
import { ClientSession } from "mongoose";

export default interface IUserRepository extends IBaseUnitOfWork {
    createUser(userData: any, session: ClientSession): Promise<typeof UserWithBase>;
    getUserByUsername(userData: any): Promise<typeof UserWithBase>;
    getUserById(userData: any): Promise<typeof UserWithBase>;
    getAllUser(userData: any): Promise<typeof UserWithBase[]>;
    deleteUserById(userData: any, session: ClientSession): Promise<any>;
    updateUserById(userData: any, queryData: any, session: ClientSession): Promise<typeof UserWithBase>;
    changePassword(userData: any, queryData: any, session: ClientSession): Promise<typeof UserWithBase>;
}