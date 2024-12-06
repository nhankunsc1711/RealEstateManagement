import {Request, Response} from 'express';
import IRealestateService from "../../Application/Persistences/IServices/IRealestateService";
import RealestateService from "../../Application/Features/Realestate/RealestateService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {CreateRealestateRequest} from "../../Application/Features/Realestate/Requests/CreateRealestateRequest";
import {FindAllRealestateRequest} from "../../Application/Features/Realestate/Requests/FindAllRealestateRequest";
import {UpdateRealestateRequest} from "../../Application/Features/Realestate/Requests/UpdateRealestateRequest";
import {FindRealestateByIdRequest} from "../../Application/Features/Realestate/Requests/FindRealestateByIdRequest";
import {DeleteRealestateRequest} from "../../Application/Features/Realestate/Requests/DeleteRealestateRequest";

import mongoose from "mongoose";


export default class RealestateController {
    private realestateService: IRealestateService = new RealestateService();

    createRealestate = async (req: Request<any, any, CreateRealestateRequest>,res: Response) => {
        try {
            const {title, description, address, type, area, price, utilities, employeeId, imagePath} = req.body;

            const data = {
                title, 
                description, 
                address, type, 
                area, 
                price, 
                utilities, 
                employeeId, 
                imagePath
            }
            const result = await this.realestateService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllRealestate = async (req: Request<any, any, FindAllRealestateRequest>,res: Response) => {
        try {
            const result = await this.realestateService.getAllRealestate();

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateRealestate = async (req: Request<UpdateRealestateRequest, any, UpdateRealestateRequest>, res: Response) => {
        try {
            const {realestateId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(realestateId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid RealestateId'});
            }

            const {title, description, address, type, area, price, utilities, employeeId, imagePath} = req.body;

            const data = {
                title, 
                description, 
                address, type, 
                area, 
                price, 
                utilities, 
                employeeId, 
                imagePath
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

}
