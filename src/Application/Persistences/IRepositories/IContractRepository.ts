import { ClientSession } from "mongoose";
import { Contract, ContractWithBase } from "../../../Domain/Models/ContractModel";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";


export default interface IContractRepository extends IBaseUnitOfWork{
    createContract(contractData: any, session: ClientSession): Promise<typeof ContractWithBase>;
    getContractById(contractData: any): Promise<typeof ContractWithBase>;
    getAllContract(contractData: any): Promise<typeof ContractWithBase[]>;
    updateContractById(contractData: any, queryData: any, session: ClientSession): Promise<typeof ContractWithBase>;
    deleteContractById(contractData: any, session: ClientSession): any;
}