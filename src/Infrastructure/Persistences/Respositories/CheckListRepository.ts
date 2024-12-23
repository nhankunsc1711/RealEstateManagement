import { CheckList, CheckListWithBase } from "../../../Domain/Models/CheckListModel";
import ICheckListRepository from "../../../Application/Persistences/IRepositories/ICheckListRepository";
import { BaseUnitOfWork } from './BaseUnitOfWork';
import mongoose, {ClientSession} from "mongoose";

class CheckListRepository extends BaseUnitOfWork implements ICheckListRepository{ constructor(){ super(); }

    private buildQuery(criteria: any): any {
      return {
          _id: criteria._id ? new mongoose.Types.ObjectId(criteria._id) : undefined,
          isDeleted: criteria.isDeleted,
          isActived: criteria.isActived
      };
    }
    
    async createCheckList(checkListData: any, session: ClientSession): Promise<typeof CheckListWithBase>{
        try {
          const { guestId, employeeId, realestateId} = checkListData;
          const checkList: any = await CheckListWithBase.create([{
            guestId: new mongoose.Types.ObjectId(guestId),
            employeeId: new mongoose.Types.ObjectId(employeeId),
            realestateId: new mongoose.Types.ObjectId(realestateId),
          }], {session});       
          return checkList[0];
        }catch (error: any) {
          throw new Error("Error at createCheckList in CheckListRepository: " + error.message);
        }
    }

    async getCheckListById(checkListData: any): Promise<typeof CheckListWithBase>{
        try {
          const query = this.buildQuery(checkListData);
          const checkList: typeof CheckListWithBase[] = await CheckListWithBase.find(query);
          return checkList[0];
        } catch (error: any) {
          throw new Error("Error at getCheckListById in CheckListRepository: " + error.meesage);
        }
    }

    async getAllCheckList(checkListData: any): Promise<typeof CheckListWithBase[]>{
        try {
          const checkList: typeof CheckListWithBase[] = await CheckListWithBase.find(checkListData);
          return checkList;
        } catch (error: any) {
          throw new Error("Error at getCheckListById in CheckListRepository: " + error.meesage);
        }
    }

    async updateCheckListById(checkListData: any, checkListUpdateData: any, session: ClientSession): Promise<typeof CheckListWithBase> {
      try {
        const query = this.buildQuery(checkListData);
        const updateData: any = {
          ...checkListUpdateData,
          updatedAt: Date.now()
        }
        const updatedCheckList: any = await CheckListWithBase.findOneAndUpdate(query, updateData, {
          session,
          new: true
        });
        if (!updatedCheckList) {
          throw new Error("CheckList not found after update");
        }
        return updatedCheckList[0];
      } catch (error: any) {
        throw new Error("Error at updateCheckListById in CheckListRepository: " + error.message);
      }
    }

    async deleteCheckListById(checkListData: any, session: ClientSession){
      try {
        const query = this.buildQuery(checkListData);
        await CheckListWithBase.deleteOne(query, {session});
      } catch (error: any) {
        throw new Error("Error at deleteCheckListById in CheckListRepository: " + error.meesage);
      }
    }
}

export default CheckListRepository;