import IRoleService from "../../Persistences/IServices/IRoleService";
import IRoleRepository from "../../Persistences/IRepositories/IRoleRepository";

import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateRoleResponse} from "./Responses/CreateRoleResponse";
import {GetRoleResponse} from "./Responses/GetRoleResponse";
import {GetAllRoleResponse} from "./Responses/GetAllRoleResponse";
import {UpdateRoleResponse} from "./Responses/UpdateRoleResponse";
import {DeleteRoleResponse} from "./Responses/DeleteRoleResponse";


export default class RoleService implements IRoleService {
    private roleRepository: IRoleRepository = new RoleRepository();

    async create(data: any): Promise<CreateRoleResponse | CoreException> {
        const session = await this.roleRepository.startTransaction();
        try {
            const result: any = await this.roleRepository.createRole(data, session);
            await this.roleRepository.commitTransaction();
            return new CreateRoleResponse("Create Role Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getRoleById(roleId: string): Promise<GetRoleResponse | CoreException> {
        try {
            const roleData = {
                _id: roleId,
                isActived: true,
                isDeleted: false
            }
            const role: any = await this.roleRepository.getRoleById(roleData);
            if (!role || role === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Role not found");
            }
            return new GetRoleResponse("Find Role Success", StatusCodeEnums.OK_200, role);
        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllRole(roleData: any): Promise<GetAllRoleResponse | CoreException> {
        try {
            const role: any = await this.roleRepository.getAllRole(roleData);
            if (!role || role === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Role not found");
            }
            return new GetAllRoleResponse("Find All Role Success", StatusCodeEnums.OK_200, role);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateRoleById(roleId: string, updateData: any): Promise<UpdateRoleResponse | CoreException> {
        const session = await this.roleRepository.startTransaction();
        try {
            const roleData: any = {
                _id: roleId,
                isActived: true,
                isDeleted: false
            }
            const role: any = await this.roleRepository.getRoleById(roleData);
            if (!role || role === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Role not found!");
            }
            const result: any = await this.roleRepository.updateRoleById(roleData, updateData, session);
            await this.roleRepository.commitTransaction();
            return new UpdateRoleResponse("Update Role Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteRoleById(roleId: string): Promise<DeleteRoleResponse | CoreException> {
        const session = await this.roleRepository.startTransaction();
        try {
            const roleData: any = {
                _id: roleId,
                isActived: true,
                isDeleted: false
            }
            const role: any = await this.roleRepository.getRoleById(roleData);
            if (!role || role === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Role not found!");
            }
            const result: any = await this.roleRepository.deleteRoleById(roleData, session);

            await this.roleRepository.commitTransaction();
            return new DeleteRoleResponse("Delete Role Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}