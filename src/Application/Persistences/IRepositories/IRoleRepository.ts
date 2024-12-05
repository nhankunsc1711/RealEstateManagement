import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import {ClientSession} from "mongoose";
import {RoleWithBase} from "../../../Domain/Models/RoleModel";

interface IRoleRepository extends IBaseUnitOfWork{
    getRoleById(roleId: string, queryData: any): Promise<typeof RoleWithBase | null>;
    getAllRoles(queryData: any): Promise<typeof RoleWithBase[] | null>;
    createRole(roleData: any, session: ClientSession): Promise<typeof RoleWithBase>;
    updateRoleById(roleId: string, roleData: any, session: ClientSession): Promise<typeof RoleWithBase | null>;
    deleteRoleById(roleId: string, session: ClientSession): Promise<typeof RoleWithBase | null>;
    getRoleIdByRoleName(roleName: string, queryData: any): Promise<string|null|unknown>;
}

export default IRoleRepository;