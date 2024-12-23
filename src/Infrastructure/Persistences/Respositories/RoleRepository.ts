import { Role, RoleWithBase } from "../../../Domain/Models/RoleModel";
import IRoleRepository from "../../../Application/Persistences/IRepositories/IRoleRepository";
import { BaseUnitOfWork } from './BaseUnitOfWork';
import mongoose, {ClientSession} from "mongoose";

class RoleRepository extends BaseUnitOfWork implements IRoleRepository{ constructor(){ super(); }

    private buildQuery(criteria: any): any {
        const query: any = {
            isDeleted: criteria.isDeleted,
            isActived: criteria.isActived,
        };
        if (criteria._id) {
          query._id = new mongoose.Types.ObjectId(criteria._id);
        }
        if (criteria.name){
          query.name = criteria.name;
        }
        return query;
    }

    async createRole(roleData: any, session: ClientSession): Promise<typeof RoleWithBase>{
        try {
          const role: any = await RoleWithBase.create([{
              ...roleData
          }], {session});       
          return role[0];
        }catch (error: any) {
          console.log("Error at Repository");
          throw new Error("Error at createRole in RoleRepository: " + error.message);
        }
    }

    async getRoleById(roleData: any): Promise<typeof RoleWithBase>{
        try {
          const query = this.buildQuery(roleData);
          const role: typeof RoleWithBase[] = await RoleWithBase.find(query);
          return role[0];
        } catch (error: any) {
          throw new Error("Error at getRoleById in RoleRepository: " + error.meesage);
        }
    }

    async getAllRole(roleData: any): Promise<typeof RoleWithBase[]>{
        try {
          const role: typeof RoleWithBase[] = await RoleWithBase.find(roleData);
          return role;
        } catch (error: any) {
          throw new Error("Error at getRoleById in RoleRepository: " + error.meesage);
        }
    }

    async updateRoleById(roleData: any, roleUpdateData: any, session: ClientSession): Promise<typeof RoleWithBase> {
      try {
        const query = this.buildQuery(roleData);
        const updateData: any = {
          ...roleUpdateData,
          updatedAt: Date.now()
        }
        const updatedRole: any = await RoleWithBase.findOneAndUpdate(query, updateData, {
          session,
          new: true
        });
        if (!updatedRole) {
          throw new Error("Role not found after update");
        }
        return updatedRole;
      } catch (error: any) {
        throw new Error("Error at updateRoleById in RoleRepository: " + error.message);
      }
    }

    async deleteRoleById(roleData: any, session: ClientSession){
        try {
          const query = this.buildQuery(roleData);
          await RoleWithBase.deleteOne(query, {session});
        } catch (error: any) {
          throw new Error("Error at deleteRoleById in RoleRepository: " + error.meesage);
        }
    }

    async getRoleByRoleName(roleData: any): Promise<typeof RoleWithBase> {
      try {
          const query = this.buildQuery(roleData);
          const role: typeof RoleWithBase[] = await RoleWithBase.find(query);
          return role[0];
      } catch (error: any) {
          throw new Error("Error occured at getRoleIdByRoleName in RoleRepository: " + error.message);
      }
    }
}

export default RoleRepository;