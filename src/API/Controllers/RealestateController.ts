import {Request, Response} from 'express';
import IRealestateService from "../../Application/Persistences/IServices/IRealestateService";
import RealestateService from "../../Application/Features/Realestate/RealestateService";
import {CreateRealestateRequest} from "../../Application/Features/Realestate/Requests/CreateRealestateRequest";
import {FindAllRealestateRequest} from "../../Application/Features/Realestate/Requests/FindAllRealestateRequest";
import {UpdateRealestateRequest} from "../../Application/Features/Realestate/Requests/UpdateRealestateRequest";
import {FindRealestateByIdRequest} from "../../Application/Features/Realestate/Requests/FindRealestateByIdRequest";
import {DeleteRealestateRequest} from "../../Application/Features/Realestate/Requests/DeleteRealestateRequest";
import {enrichRealEstate} from "../../Application/Common/Helpers/enrichObject";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import mongoose from "mongoose";


export default class RealestateController {
    private realestateService: IRealestateService = new RealestateService();

    createRealestate = async (req: Request<CreateRealestateRequest, any, any>,res: Response) => {
        try {
            const {title, description, address, tagName, area, price, utilities, imagePath} = req.body;
            const employeeId: string = (req as any).user?.userId;
            const status: string = "Pending"; 
            const data = {
                title, 
                description, 
                address, 
                tagName, 
                area, 
                price, 
                utilities, 
                employeeId, 
                imagePath,
                status
            }
            const result = await this.realestateService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllRealestateForUser = async (req: Request<FindAllRealestateRequest, any, any>,res: Response) => {
        try {
            const userId: string = (req as any).user?.userId;
            console.log(userId);
            const result: any = await this.realestateService.getAllRealestate({status: "Approved"});
            let realestateData = result.data;
            if(userId === undefined){
                realestateData = realestateData.map(({ price, ...rest }: any) => rest);
            }
            realestateData = await enrichRealEstate(realestateData);
            console.log(realestateData);
            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getAllRealestate = async (req: Request<FindAllRealestateRequest, any, any>,res: Response) => {
        try {
            const userId: string = (req as any).user?.userId;
            const result: any = await this.realestateService.getAllRealestate({});
            let realestateData = result.data;
            if(userId === undefined){
                realestateData = realestateData.map(({ price, ...rest }: any) => rest);
            }
            realestateData = await enrichRealEstate(realestateData);
            console.log(realestateData);
            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateRealestate = async (req: Request<UpdateRealestateRequest, any, any>, res: Response) => {
        try {
            const {realestateId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(realestateId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid RealestateId'});
            }

            const {title, description, address, tagName, area, price, utilities, employeeId, imagePath, status} = req.body;

            const data = {
                title, 
                description, 
                address, 
                tagName, 
                area, 
                price, 
                utilities, 
                employeeId, 
                imagePath,
                status
            }
            const result: any = await this.realestateService.updateRealestateById(realestateId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getRealestate = async (req: Request<FindRealestateByIdRequest, any, any>, res: Response) => {
        try {
            const {realestateId} = req.params;
            if (!mongoose.Types.ObjectId.isValid(realestateId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid RealestateId'});
            }

            const result: any = await this.realestateService.getRealestateById(realestateId);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    deleteRealestate = async (req: Request<DeleteRealestateRequest, any, any>,res: Response) => {
        try {
            const {realestateId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(realestateId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid RealestateId'});
            }

            const result: any = await this.realestateService.deleteRealestateById(realestateId);
            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    changeStatusRealestate = async (req: Request<UpdateRealestateRequest, any, any>, res: Response) => {
        try {
            const {realestateId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(realestateId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid RealestateId'});
            }

            const {status} = req.body;

            const data = {
                status
            }
            const result: any = await this.realestateService.updateRealestateById(realestateId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

}
