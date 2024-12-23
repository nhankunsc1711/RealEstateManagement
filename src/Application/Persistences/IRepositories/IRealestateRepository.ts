import { ClientSession } from "mongoose";
import { Realestate, RealestateWithBase } from "../../../Domain/Models/RealestateModel";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";


export default interface IRealestateRepository extends IBaseUnitOfWork{
    createRealestate(realestateData: any, session: ClientSession): Promise<typeof RealestateWithBase>;
    getRealestateById(realestateData: any): Promise<typeof RealestateWithBase>;
    getAllRealestate(realestateData: any): Promise<typeof RealestateWithBase[]>;
    updateRealestateById(realestateData: any, queryData: any, session: ClientSession): Promise<typeof RealestateWithBase>;
    deleteRealestateById(realestateData: any, session: ClientSession): any;
}