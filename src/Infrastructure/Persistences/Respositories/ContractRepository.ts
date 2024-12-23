import { Contract, ContractWithBase } from "../../../Domain/Models/ContractModel";
import IContractRepository from "../../../Application/Persistences/IRepositories/IContractRepository";
import { BaseUnitOfWork } from './BaseUnitOfWork';
import mongoose, {ClientSession} from "mongoose";

class ContractRepository extends BaseUnitOfWork implements IContractRepository{ constructor(){ super(); }

    private buildQuery(criteria: any): any {
      return {
          _id: criteria._id ? new mongoose.Types.ObjectId(criteria._id) : undefined,
          isDeleted: criteria.isDeleted,
          isActived: criteria.isActived
      };
    }

    async createContract(contractData: any, session: ClientSession): Promise<typeof ContractWithBase>{
        try {
          const { guestId, employeeId, realestateId, ...restData } = contractData;
          const contract: any = await ContractWithBase.create([{
            guestId: new mongoose.Types.ObjectId(guestId),
            employeeId: new mongoose.Types.ObjectId(employeeId),
            realestateId: new mongoose.Types.ObjectId(realestateId),
            ...restData
          }], {session});       
          return contract[0];
        }catch (error: any) {
          console.log("Error at Repository");
          throw new Error("Error at createContract in ContractRepository: " + error.message);
        }
    }

    async getContractById(contractData: any): Promise<typeof ContractWithBase>{
        try {
          const query = this.buildQuery(contractData);
          const contract: typeof ContractWithBase[] = await ContractWithBase.find(query);
          return contract[0];
        } catch (error: any) {
          throw new Error("Error at getContractById in ContractRepository: " + error.meesage);
        }
    }

    async getAllContract(contractData: any): Promise<typeof ContractWithBase[]>{
        try {
          const contract: typeof ContractWithBase[] = await ContractWithBase.find(contractData);
          return contract;
        } catch (error: any) {
          throw new Error("Error at getContractById in ContractRepository: " + error.meesage);
        }
    }

    async updateContractById(contractData: any, contractUpdateData: any, session: ClientSession): Promise<typeof ContractWithBase> {
      try {
        const query = this.buildQuery(contractData);
        const updateData: any = {
          ...contractUpdateData,
          updatedAt: Date.now()
        }
        const updatedContract: any = await ContractWithBase.findOneAndUpdate(query, updateData, {
          session,
          new: true
        });
        if (!updatedContract) {
          throw new Error("Contract not found after update");
        }
        return updatedContract;
      } catch (error: any) {
        throw new Error("Error at updateContractById in ContractRepository: " + error.message);
      }
    }

    async deleteContractById(contractData: any, session: ClientSession){
        try {
          const query = this.buildQuery(contractData);
          await ContractWithBase.deleteOne(query, {session});
        } catch (error: any) {
          throw new Error("Error at deleteContractById in ContractRepository: " + error.meesage);
        }
    }
}

export default ContractRepository;