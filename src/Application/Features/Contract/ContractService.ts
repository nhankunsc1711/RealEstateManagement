import IContractService from "../../Persistences/IServices/IContractService";

import IContractRepository from "../../Persistences/IRepositories/IContractRepository";
import ContractRepository from "../../../Infrastructure/Persistences/Respositories/ContractRepository";
import ICheckListRepository from "../../Persistences/IRepositories/ICheckListRepository";
import CheckListRepository from "../../../Infrastructure/Persistences/Respositories/CheckListRepository";

import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateContractResponse} from "./Responses/CreateContractResponse";
import {GetContractResponse} from "./Responses/GetContractResponse";
import {GetAllContractResponse} from "./Responses/GetAllContractResponse";
import {UpdateContractResponse} from "./Responses/UpdateContractResponse";
import {DeleteContractResponse} from "./Responses/DeleteContractResponse";


export default class ContractService implements IContractService {
    private contractRepository: IContractRepository = new ContractRepository();
    private checkListRepository: ICheckListRepository = new CheckListRepository();

    async create(data: any): Promise<CreateContractResponse | CoreException> {
        const session = await this.contractRepository.startTransaction();
        try {
            let {checkListId, ...contractData} = data;
            const checkListData: any = {
                _id: checkListId,
                isActived: true,
                isDeleted: false
            }
            const checkList: any = await this.checkListRepository.getCheckListById(checkListData);
            if (!checkList || checkList === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "CheckList not found");
            }
            console.log(checkList);
            contractData = {
                ...contractData,
                realestateId: checkList.realestateId,
                guestId: checkList.guestId
            }
            const result: any = await this.contractRepository.createContract(contractData, session);
            await this.contractRepository.commitTransaction();
            return new CreateContractResponse("Create Contract Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getContractById(contractId: string): Promise<GetContractResponse | CoreException> {
        try {
            const contractData = {
                _id: contractId,
                isActived: true,
                isDeleted: false
            }
            const contract: any = await this.contractRepository.getContractById(contractData);
            if (!contract || contract === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Contract not found");
            }
            return new GetContractResponse("Find Contract Success", StatusCodeEnums.OK_200, contract);
        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllContract(contractData: any): Promise<GetAllContractResponse | CoreException> {
        try {
            const contract: any = await this.contractRepository.getAllContract(contractData);
            if (!contract || contract === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Contract not found");
            }
            return new GetAllContractResponse("Find All Contract Success", StatusCodeEnums.OK_200, contract);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateContractById(contractId: string, updateData: any): Promise<UpdateContractResponse | CoreException> {
        const session = await this.contractRepository.startTransaction();
        try {
            const contractData: any = {
                _id: contractId,
                isActived: true,
                isDeleted: false
            }
            const contract: any = await this.contractRepository.getContractById(contractData);
            if (!contract || contract === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Contract not found!");
            }
            const result: any = await this.contractRepository.updateContractById(contractData, updateData, session);
            await this.contractRepository.commitTransaction();
            return new UpdateContractResponse("Update Contract Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteContractById(contractId: string): Promise<DeleteContractResponse | CoreException> {
        const session = await this.contractRepository.startTransaction();
        try {
            const contractData: any = {
                _id: contractId,
                isActived: true,
                isDeleted: false
            }
            const contract: any = await this.contractRepository.getContractById(contractData);
            if (!contract || contract === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Contract not found!");
            }
            const result: any = await this.contractRepository.deleteContractById(contractData, session);

            await this.contractRepository.commitTransaction();
            return new DeleteContractResponse("Delete Contract Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}