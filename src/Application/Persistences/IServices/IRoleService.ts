import {CreateRoleResponse} from "../../Features/Role/Responses/CreateRoleResponse";
import {GetRoleResponse} from "../../Features/Role/Responses/GetRoleResponse";
import {GetAllRoleResponse} from "../../Features/Role/Responses/GetAllRoleResponse";
import {UpdateRoleResponse} from "../../Features/Role/Responses/UpdateRoleResponse";
import {DeleteRoleResponse} from "../../Features/Role/Responses/DeleteRoleResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface IRoleService {
    create(data: any): Promise<CreateRoleResponse | CoreException>;
    getRoleById(roleId: any): Promise<GetRoleResponse | CoreException>;
    getAllRole(): Promise<GetAllRoleResponse | CoreException>;
    updateRoleById(roleId: any, updateData: any): Promise<UpdateRoleResponse | CoreException>;
    deleteRoleById(roleId: any): Promise<DeleteRoleResponse | CoreException>;
}