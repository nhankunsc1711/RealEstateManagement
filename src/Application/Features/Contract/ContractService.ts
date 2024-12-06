import IContractService from "../../Persistences/IServices/IContractService";
import IContractRepository from "../../Persistences/IRepositories/IContractRepository";

import ContractRepository from "../../../Infrastructure/Persistences/Respositories/ContractRepository";
import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateContractResponse} from "./Responses/CreateContractResponse";
import {GetContractResponse} from "./Responses/GetContractResponse";
import {GetAllContractResponse} from "./Responses/GetAllContractResponse";
import {UpdateContractResponse} from "./Responses/UpdateContractResponse";
import {DeleteContractResponse} from "./Responses/DeleteContractResponse";

import {ContractWithBase} from "../../../Domain/Models/ContractModel";

export default class ContractService implements IContractService {
    private contractRepository: IContractRepository = new ContractRepository();

    async create(data: any): Promise<CreateContractResponse | CoreException> {
        const session = await this.contractRepository.startTransaction();
        try {
            const result = await this.contractRepository.createContract(data, session);

            await this.contractRepository.commitTransaction();
            return new CreateContractResponse("Create Contract Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getContractById(ContractId: any): Promise<GetContractResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result: typeof ContractWithBase | null = await this.contractRepository.getContractById(ContractId, query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Contract not found");
            }
            return new GetContractResponse("Find Contract Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllContract(): Promise<GetAllContractResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result = await this.contractRepository.getAllContracts(query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Contract not found");
            }

            console.log("Result:", result);

            return new GetAllContractResponse("Find All Contract Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateContractById(ContractId: any, updateData: any): Promise<UpdateContractResponse | CoreException> {
        try {
            const session = await this.contractRepository.startTransaction();

            const result: typeof ContractWithBase | null = await this.contractRepository.updateContractById(ContractId, updateData, session);
            await this.contractRepository.commitTransaction();

            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Contract not found");
            }

            return new UpdateContractResponse("Update Contract Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteContractById(ContractId: any): Promise<DeleteContractResponse | CoreException> {
        try {
            const session = await this.contractRepository.startTransaction();

            const result: any = await this.contractRepository.deleteContractById(ContractId, session);

            await this.contractRepository.commitTransaction();
            return new DeleteContractResponse("Delete Contract Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.contractRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}