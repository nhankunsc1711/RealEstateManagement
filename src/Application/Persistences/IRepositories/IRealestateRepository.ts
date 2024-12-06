import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import {ClientSession} from "mongoose";
import {RealestateWithBase} from "../../../Domain/Models/RealestateModel";

interface IRealestateRepository extends IBaseUnitOfWork{
    getRealestateById(realestateId: string, queryData: any): Promise<typeof RealestateWithBase | null>;
    getAllRealestates(queryData: any): Promise<typeof RealestateWithBase[] | null>;
    createRealestate(realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase>;
    updateRealestateById(realestateId: string, realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase | null>;
    deleteRealestateById(realestateId: string, session: ClientSession): Promise<typeof RealestateWithBase | null>;
}

export default IRealestateRepository;
