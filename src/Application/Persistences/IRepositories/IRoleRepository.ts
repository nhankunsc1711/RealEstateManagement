import { ClientSession } from "mongoose";
import { Role, RoleWithBase } from "../../../Domain/Models/RoleModel";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";


export default interface IRoleRepository extends IBaseUnitOfWork{
    createRole(roleData: any, session: ClientSession): Promise<typeof RoleWithBase>;
    getRoleById(roleData: any): Promise<typeof RoleWithBase>;
    getAllRole(roleData: any): Promise<typeof RoleWithBase[]>;
    updateRoleById(roleData: any, queryData: any, session: ClientSession): Promise<typeof RoleWithBase>;
    deleteRoleById(roleData: any, session: ClientSession): any;
    getRoleByRoleName(roleData: any): Promise<typeof RoleWithBase>;
}