import { BaseUnitOfWork } from './BaseUnitOfWork';
import IUserRepository from '../../../Application/Persistences/IRepositories/IUserRepository';
import { UserWithBase } from '../../../Domain/Models/UserAccount';
import mongoose, { ClientSession } from 'mongoose';
import { hashPassword } from '../../../Application/Common/Helpers/passwordUtils';

class UserRepository extends BaseUnitOfWork implements IUserRepository {
    constructor() {
        super();
    }

    private buildQuery(criteria: any): any {
        const query: any = {
            isDeleted: criteria.isDeleted,
            isActived: criteria.isActived,
        };
        if (criteria._id) {
          query._id = new mongoose.Types.ObjectId(criteria._id);
        }
        if (criteria.username){
          query.username = criteria.username;
        }
        return query;
    }

    private async updateUser(query: any, updateData: any, session: ClientSession): Promise<typeof UserWithBase> {
        try {
            const updatedUser: any = await UserWithBase.findOneAndUpdate(query, updateData, { session, new: true });
            if (!updatedUser) {
                throw new Error("User not found after update");
            }
            return updatedUser;
        } catch (error: any) {
            throw new Error(`Error at updateUserById in UserRepository: ${error.message}`);
        }
    }

    async createUser(userData: any, session: ClientSession): Promise<typeof UserWithBase> {
        try {
            const { password, roleId, ...restData } = userData;

            const hashedPassword: string = await hashPassword(password);

            const user: any = await UserWithBase.create([
                {
                    password: hashedPassword,
                    roleId: new mongoose.Types.ObjectId(roleId),
                    ...restData,
                },
            ], { session });

            return user[0];
        } catch (error: any) {
            throw new Error(`Error occured at createUser in UserRepository: ${error.message}`);
        }
    }

    async getUserByUsername(userData: any): Promise<typeof UserWithBase> {
        try {
            const query = this.buildQuery(userData);
            const user: typeof UserWithBase[] = await UserWithBase.find(query);
            return user[0];
        } catch (error: any) {
            throw new Error(`Error at getUserByUsername in UserRepository: ${error.message}`);
        }
    }

    async getUserById(userData: any): Promise<typeof UserWithBase> {
        try {
            const query = this.buildQuery(userData);
            const user: typeof UserWithBase[] = await UserWithBase.find(query);
            return user[0];
        } catch (error: any) {
            throw new Error(`Error at getUserById in UserRepository: ${error.message}`);
        }
    }

    async getAllUser(userData: any): Promise<typeof UserWithBase[]>{
        try {
          const user: typeof UserWithBase[] = await UserWithBase.find(userData);
          return user;
        } catch (error: any) {
          throw new Error("Error at getTagById in TagRepository: " + error.meesage);
        }
    }

    async deleteUserById(userData: any, session: ClientSession): Promise<{ acknowledged: boolean; deletedCount: number }> {
        try {
            const query = this.buildQuery(userData);
            const result = await UserWithBase.deleteOne(query, { session });
            return result;
        } catch (error: any) {
            throw new Error(`Error at deleteUserById in UserRepository: ${error.message}`);
        }
    }

    

    async updateUserById(userData: any, userUpdateData: any, session: ClientSession): Promise<typeof UserWithBase> {
        const query = this.buildQuery(userData);
        const updateData = { ...userUpdateData, updatedAt: Date.now() };
        return this.updateUser(query, updateData, session);
    }

    async changePassword(userData: any, userUpdateData: any, session: ClientSession): Promise<typeof UserWithBase> {
        const query = this.buildQuery(userData);
        const hashedPassword: string = await hashPassword(userUpdateData.password);
        const updateData = { password: hashedPassword, updatedAt: Date.now() };
        return this.updateUser(query, updateData, session);
    }
}

export default UserRepository;
