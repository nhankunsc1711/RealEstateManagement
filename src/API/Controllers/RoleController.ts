import {Request, Response} from 'express';
import IRoleService from "../../Application/Persistences/IServices/IRoleService";
import RoleService from "../../Application/Features/Role/RoleService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {CreateRoleRequest} from "../../Application/Features/Role/Requests/CreateRoleRequest";
import {FindAllRoleRequest} from "../../Application/Features/Role/Requests/FindAllRoleRequest";
import {UpdateRoleRequest} from "../../Application/Features/Role/Requests/UpdateRoleRequest";
import {FindRoleByIdRequest} from "../../Application/Features/Role/Requests/FindRoleByIdRequest";
import {DeleteRoleRequest} from "../../Application/Features/Role/Requests/DeleteRoleRequest";

import mongoose from "mongoose";
//import {RolePermissionEnums} from "../../Domain/Enums/RolePermissionEnums";


export default class RoleController {
    private roleService: IRoleService = new RoleService();

    createRole = async (req: Request<any, any, CreateRoleRequest>,res: Response) => {
        try {
            const {name, description, bitwisePermission} = req.body;

            const data = {
                name,
                description,
                bitwisePermission
            }
            const result = await this.roleService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllRole = async (req: Request<any, any, FindAllRoleRequest>,res: Response) => {
        try {
            const result = await this.roleService.getAllRole();

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateRole = async (req: Request<UpdateRoleRequest, any, UpdateRoleRequest>, res: Response) => {
        try {
            const {roleId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid roleId'});
            }

            const {name, description, bitwisePermission} = req.body;
            const data = {
                name,
                description,
                bitwisePermission
            }
            const result: any = await this.roleService.updateRoleById(roleId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getRole = async (req: Request<FindRoleByIdRequest, any, any>, res: Response) => {
        try {
            const {roleId} = req.params;
            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid roleId'});
            }

            const result: any = await this.roleService.getRoleById(roleId);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    deleteRole = async (req: Request<DeleteRoleRequest, any, any>,res: Response) => {
        try {
            const {roleId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(roleId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid roleId'});
            }

            const result: any = await this.roleService.deleteRoleById(roleId);
            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

}
