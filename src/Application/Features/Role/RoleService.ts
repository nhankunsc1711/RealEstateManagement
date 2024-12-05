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

import {RoleWithBase} from "../../../Domain/Models/RoleModel";

export default class RoleService implements IRoleService {
    private roleRepository: IRoleRepository = new RoleRepository();

    async create(data: any): Promise<CreateRoleResponse | CoreException> {
        const session = await this.roleRepository.startTransaction();
        try {
            const result = await this.roleRepository.createRole(data, session);

            await this.roleRepository.commitTransaction();
            return new CreateRoleResponse("Create Role Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getRoleById(roleId: any): Promise<GetRoleResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result: typeof RoleWithBase | null = await this.roleRepository.getRoleById(roleId, query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Role not found");
            }
            return new GetRoleResponse("Find Role Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllRole(): Promise<GetAllRoleResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result = await this.roleRepository.getAllRoles(query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Role not found");
            }

            console.log("Result:", result);

            return new GetAllRoleResponse("Find All Role Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateRoleById(roleId: any, updateData: any): Promise<UpdateRoleResponse | CoreException> {
        try {
            const session = await this.roleRepository.startTransaction();

            const result: typeof RoleWithBase | null = await this.roleRepository.updateRoleById(roleId, updateData, session);
            await this.roleRepository.commitTransaction();

            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Role not found");
            }

            return new UpdateRoleResponse("Update Role Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteRoleById(roleId: any): Promise<DeleteRoleResponse | CoreException> {
        try {
            const session = await this.roleRepository.startTransaction();

            const result: any = await this.roleRepository.deleteRoleById(roleId, session);

            await this.roleRepository.commitTransaction();
            return new DeleteRoleResponse("Delete Role Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.roleRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}