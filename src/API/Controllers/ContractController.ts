import {Request, Response} from 'express';
import IContractService from "../../Application/Persistences/IServices/IContractService";
import ContractService from "../../Application/Features/Contract/ContractService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {CreateContractRequest} from "../../Application/Features/Contract/Requests/CreateContractRequest";
import {FindAllContractRequest} from "../../Application/Features/Contract/Requests/FindAllContractRequest";
import {UpdateContractRequest} from "../../Application/Features/Contract/Requests/UpdateContractRequest";
import {FindContractByIdRequest} from "../../Application/Features/Contract/Requests/FindContractByIdRequest";
import {DeleteContractRequest} from "../../Application/Features/Contract/Requests/DeleteContractRequest";

import mongoose from "mongoose";


export default class ContractController {
    private contractService: IContractService = new ContractService();

    createContract = async (req: Request<any, any, CreateContractRequest>,res: Response) => {
        try {
            const {name, type, description, guestId, employeeId, fileURL, issueDate, expiryDate} = req.body;

            const data = {
                name,
                type,
                description,
                guestId,
                employeeId,
                fileURL,
                issueDate,
                expiryDate
            }
            const result = await this.contractService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllContract = async (req: Request<any, any, FindAllContractRequest>,res: Response) => {
        try {
            const result = await this.contractService.getAllContract();

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateContract = async (req: Request<UpdateContractRequest, any, UpdateContractRequest>, res: Response) => {
        try {
            const {contractId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(contractId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid ContractId'});
            }

            const {name, type, description, guestId, employeeId, fileURL, issueDate, expiryDate} = req.body;
            const data = {
                name,
                type,
                description,
                guestId,
                employeeId,
                fileURL,
                issueDate,
                expiryDate
            }
            const result: any = await this.contractService.updateContractById(contractId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getContract = async (req: Request<FindContractByIdRequest, any, any>, res: Response) => {
        try {
            const {contractId} = req.params;
            if (!mongoose.Types.ObjectId.isValid(contractId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid ContractId'});
            }

            const result: any = await this.contractService.getContractById(contractId);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    deleteContract = async (req: Request<DeleteContractRequest, any, any>,res: Response) => {
        try {
            const {contractId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(contractId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid ContractId'});
            }

            const result: any = await this.contractService.deleteContractById(contractId);
            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

}
