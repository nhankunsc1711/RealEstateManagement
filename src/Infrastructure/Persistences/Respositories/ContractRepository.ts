import mongoose, {ClientSession} from "mongoose";
import {BaseUnitOfWork} from './BaseUnitOfWork';
import IContractRepository from "../../../Application/Persistences/IRepositories/IContractRepository";
import {ContractWithBase} from "../../../Domain/Models/ContractModel";

class ContractRepository extends BaseUnitOfWork implements IContractRepository {
    constructor() {
        super();
    }

    async createContract(contractData: any, session: ClientSession): Promise<typeof ContractWithBase> {
        try {
            const contract: any = await ContractWithBase.create([{
                ...contractData
            }], {session});
            return contract;
        } catch (error: any) {
            throw new Error("Error at createContract in ContractRepository: " + error.message);
        }
    }

    async deleteContractById(contractId: string, session: ClientSession): Promise<typeof ContractWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(contractId)
            }
            const result:typeof ContractWithBase | null=  await ContractWithBase.findOneAndUpdate(query, {
                isActive: false,
                isDeleted: true
            }, {session});

            if (result == null) return null;
            return result;
        } catch (error: any) {
            throw new Error("Error at deleteContractById in ContractRepository: " + error.message);
        }
    }

    async getContractById(contractId: string, queryData: any): Promise<typeof ContractWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(contractId),
                isActive: queryData.isActive,
                isDeleted: queryData.isDeleted
            };
            const contracts: typeof ContractWithBase[] = await ContractWithBase.find(query);
            if (contracts == null) return null;
            return contracts[0];
        } catch (error: any) {
            throw new Error("Error at getContractById in ContractRepository: " + error.message);
        }
    }

    async updateContractById(contractId: string, contractData: any, session: ClientSession): Promise<typeof ContractWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(contractId)
            };
            const result: typeof ContractWithBase | null= await ContractWithBase.findOneAndUpdate(query, {
                ...contractData
            }, {session});

            if (result == null) return null;

            return result;


        } catch (error: any) {
            throw new Error("Error at updateContractById in ContractRepository: " + error.message);
        }
    }

    async getAllContracts(queryData: any): Promise<typeof ContractWithBase[] | null> {
        try {
            const query: any = {
                isActive: queryData.isActive,
                isDeleted: queryData.isDeleted
            };
            return await ContractWithBase.find(query) ?? null;

        } catch (error: any) {
            throw new Error("Error at getAllContracts in ContractRepository: " + error.message);
        }
    }

}

export default ContractRepository;