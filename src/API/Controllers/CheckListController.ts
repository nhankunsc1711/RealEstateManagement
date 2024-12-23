import {Request, Response} from 'express';
import ICheckListService from "../../Application/Persistences/IServices/ICheckListService";
import CheckListService from "../../Application/Features/CheckList/CheckListService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {CreateCheckListRequest} from "../../Application/Features/CheckList/Requests/CreateCheckListRequest";
import {FindAllCheckListRequest} from "../../Application/Features/CheckList/Requests/FindAllCheckListRequest";
import {UpdateCheckListRequest} from "../../Application/Features/CheckList/Requests/UpdateCheckListRequest";
import {FindCheckListByIdRequest} from "../../Application/Features/CheckList/Requests/FindCheckListByIdRequest";
import {DeleteCheckListRequest} from "../../Application/Features/CheckList/Requests/DeleteCheckListRequest";

import mongoose from "mongoose";
//import {CheckListPermissionEnums} from "../../Domain/Enums/CheckListPermissionEnums";


export default class CheckListController {
    private checkListService: ICheckListService = new CheckListService();

    createCheckList = async (req: Request<CreateCheckListRequest, any, any>,res: Response) => {
        try {
            const guestId: string = (req as any).user?.userId;
            const {realestateId} = req.params;
            const data = {
                guestId: guestId,  
                realestateId: realestateId
            }
            console.log(data);
            const result = await this.checkListService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllCheckList = async (req: Request<FindAllCheckListRequest, any, any>,res: Response) => {
        try {
            const employeeId: string = (req as any).user?.userId;
            const result = await this.checkListService.getAllCheckList({});

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateCheckList = async (req: Request<UpdateCheckListRequest, any, any>, res: Response) => {
        try {
            const {checkListId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(checkListId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid checkListId'});
            }

            const {guestId, employeeId, realestateId, appointmentDate} = req.body;
            const data = {
                guestId, 
                employeeId, 
                realestateId, 
                appointmentDate
            }
            const result: any = await this.checkListService.updateCheckListById(checkListId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getCheckList = async (req: Request<FindCheckListByIdRequest, any, any>, res: Response) => {
        try {
            const {checkListId} = req.params;
            if (!mongoose.Types.ObjectId.isValid(checkListId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid checkListId'});
            }

            const result: any = await this.checkListService.getCheckListById(checkListId);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    deleteCheckList = async (req: Request<DeleteCheckListRequest, any, any>,res: Response) => {
        try {
            const {checkListId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(checkListId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid checkListId'});
            }

            const result: any = await this.checkListService.deleteCheckListById(checkListId);
            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

}
