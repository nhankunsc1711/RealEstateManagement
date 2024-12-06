import {CreateRealestateResponse} from "../../Features/Realestate/Responses/CreateRealestateResponse";
import {GetRealestateResponse} from "../../Features/Realestate/Responses/GetRealestateResponse";
import {GetAllRealestateResponse} from "../../Features/Realestate/Responses/GetAllRealestateResponse";
import {UpdateRealestateResponse} from "../../Features/Realestate/Responses/UpdateRealestateResponse";
import {DeleteRealestateResponse} from "../../Features/Realestate/Responses/DeleteRealestateResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface IRealestateService {
    create(data: any): Promise<CreateRealestateResponse | CoreException>;
    getRealestateById(realestateId: any): Promise<GetRealestateResponse | CoreException>;
    getAllRealestate(): Promise<GetAllRealestateResponse | CoreException>;
    updateRealestateById(realestateId: any, updateData: any): Promise<UpdateRealestateResponse | CoreException>;
    deleteRealestateById(realestateId: any): Promise<DeleteRealestateResponse | CoreException>;
}