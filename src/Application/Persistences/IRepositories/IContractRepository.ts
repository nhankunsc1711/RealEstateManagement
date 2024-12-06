import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import {ClientSession} from "mongoose";
import {ContractWithBase} from "../../../Domain/Models/ContractModel";

interface IContractRepository extends IBaseUnitOfWork{
    getContractById(contractId: string, queryData: any): Promise<typeof ContractWithBase | null>;
    getAllContracts(queryData: any): Promise<typeof ContractWithBase[] | null>;
    createContract(contractData: any, session: ClientSession): Promise<typeof ContractWithBase>;
    updateContractById(contractId: string, contractData: any, session: ClientSession): Promise<typeof ContractWithBase | null>;
    deleteContractById(contractId: string, session: ClientSession): Promise<typeof ContractWithBase | null>;
}

export default IContractRepository;
