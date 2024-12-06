import {CreateContractResponse} from "../../Features/Contract/Responses/CreateContractResponse";
import {GetContractResponse} from "../../Features/Contract/Responses/GetContractResponse";
import {GetAllContractResponse} from "../../Features/Contract/Responses/GetAllContractResponse";
import {UpdateContractResponse} from "../../Features/Contract/Responses/UpdateContractResponse";
import {DeleteContractResponse} from "../../Features/Contract/Responses/DeleteContractResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface IContractService {
    create(data: any): Promise<CreateContractResponse | CoreException>;
    getContractById(contractId: any): Promise<GetContractResponse | CoreException>;
    getAllContract(): Promise<GetAllContractResponse | CoreException>;
    updateContractById(contractId: any, updateData: any): Promise<UpdateContractResponse | CoreException>;
    deleteContractById(contractId: any): Promise<DeleteContractResponse | CoreException>;
}