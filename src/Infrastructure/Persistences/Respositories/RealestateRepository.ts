import mongoose, {ClientSession} from "mongoose";
import {BaseUnitOfWork} from './BaseUnitOfWork';
import IRealestateRepository from "../../../Application/Persistences/IRepositories/IRealestateRepository";
import {RealestateWithBase} from "../../../Domain/Models/RealestateModel";

class RealestateRepository extends BaseUnitOfWork implements IRealestateRepository {
    constructor() {
        super();
    }

    async createRealestate(realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase> {
        try {
            const realestate: any = await RealestateWithBase.create([{
                ...realestateData
            }], {session});
            return realestate;
        } catch (error: any) {
            throw new Error("Error at createRealestate in RealestateRepository: " + error.message);
        }
    }

    async deleteRealestateById(realestateId: string, session: ClientSession): Promise<typeof RealestateWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(realestateId)
            }
            const result:typeof RealestateWithBase | null=  await RealestateWithBase.findOneAndUpdate(query, {
                isActive: false,
                isDeleted: true
            }, {session});

            if (result == null) return null;
            return result;
        } catch (error: any) {
            throw new Error("Error at deleteRealestateById in RealestateRepository: " + error.message);
        }
    }

    async getRealestateById(realestateId: string, queryData: any): Promise<typeof RealestateWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(realestateId),
                isActive: queryData.isActive,
                isDeleted: queryData.isDeleted
            };
            const realestates: typeof RealestateWithBase[] = await RealestateWithBase.find(query);
            if (realestates == null) return null;
            return realestates[0];
        } catch (error: any) {
            throw new Error("Error at getRealestateById in RealestateRepository: " + error.message);
        }
    }

    async updateRealestateById(realestateId: string, realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase | null> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(realestateId)
            };
            const result: typeof RealestateWithBase | null= await RealestateWithBase.findOneAndUpdate(query, {
                ...realestateData
            }, {session});

            if (result == null) return null;

            return result;


        } catch (error: any) {
            throw new Error("Error at updateRealestateById in RealestateRepository: " + error.message);
        }
    }

    async getAllRealestates(queryData: any): Promise<typeof RealestateWithBase[] | null> {
        try {
            const query: any = {
                isActive: queryData.isActive,
                isDeleted: queryData.isDeleted
            };
            return await RealestateWithBase.find(query) ?? null;

        } catch (error: any) {
            throw new Error("Error at getAllRealestates in RealestateRepository: " + error.message);
        }
    }

}

export default RealestateRepository;