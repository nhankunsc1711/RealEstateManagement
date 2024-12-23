import { Realestate, RealestateWithBase } from "../../../Domain/Models/RealestateModel";
import IRealestateRepository from "../../../Application/Persistences/IRepositories/IRealestateRepository";
import { BaseUnitOfWork } from './BaseUnitOfWork';
import mongoose, {ClientSession} from "mongoose";

class RealestateRepository extends BaseUnitOfWork implements IRealestateRepository{ constructor(){ super(); }

    private buildQuery(criteria: any): any {
      return {
          _id: criteria._id ? new mongoose.Types.ObjectId(criteria._id) : undefined,
          isDeleted: criteria.isDeleted,
          isActived: criteria.isActived
      };
    }

    async createRealestate(realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase>{
        try {
          const {tagId, ...restData} = realestateData;
          const realestate: any = await RealestateWithBase.create([{
              tagId: new mongoose.Types.ObjectId(tagId),
              ...restData
          }], {session});       
          return realestate[0];
        }catch (error: any) {
          console.log("Error at Repository");
          throw new Error("Error at createRealestate in RealestateRepository: " + error.message);
        }
    }

    async getRealestateById(realestateData: any): Promise<typeof RealestateWithBase>{
        try {
          const query = this.buildQuery(realestateData);
          console.log(query);
          const realestate: typeof RealestateWithBase[] = await RealestateWithBase.find(query);
          return realestate[0];
        } catch (error: any) {
          throw new Error("Error at getRealestateById in RealestateRepository: " + error.meesage);
        }
    }

    async getAllRealestate(realestateData: any): Promise<typeof RealestateWithBase[]>{
        try {
          const realestate: typeof RealestateWithBase[] = await RealestateWithBase.find(realestateData);
          return realestate;
        } catch (error: any) {
          throw new Error("Error at getRealestateById in RealestateRepository: " + error.meesage);
        }
    }

    async updateRealestateById(realestateData: any, realestateUpdateData: any, session: ClientSession): Promise<typeof RealestateWithBase> {
      try {
        const query = this.buildQuery(realestateData);
        const updateData: any = {
          ...realestateUpdateData,
          updatedAt: Date.now()
        }
        const updatedRealestate: any = await RealestateWithBase.findOneAndUpdate(query, updateData, {
          session,
          new: true
        });
        if (!updatedRealestate) {
          throw new Error("Realestate not found after update");
        }
        return updatedRealestate;
      } catch (error: any) {
        throw new Error("Error at updateRealestateById in RealestateRepository: " + error.message);
      }
    }

    async deleteRealestateById(realestateData: any, session: ClientSession){
        try {
          const query = this.buildQuery(realestateData);
          await RealestateWithBase.deleteOne(query, {session});
        } catch (error: any) {
          throw new Error("Error at deleteRealestateById in RealestateRepository: " + error.meesage);
        }
    }
}

export default RealestateRepository;