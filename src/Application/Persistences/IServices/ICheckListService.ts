import {CreateCheckListResponse} from "../../Features/CheckList/Responses/CreateCheckListResponse";
import {GetCheckListResponse} from "../../Features/CheckList/Responses/GetCheckListResponse";
import {GetAllCheckListResponse} from "../../Features/CheckList/Responses/GetAllCheckListResponse";
import {UpdateCheckListResponse} from "../../Features/CheckList/Responses/UpdateCheckListResponse";
import {DeleteCheckListResponse} from "../../Features/CheckList/Responses/DeleteCheckListResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface ICheckListService {
    create(data: any): Promise<CreateCheckListResponse | CoreException>;
    getCheckListById(checkListId: string): Promise<GetCheckListResponse | CoreException>;
    getAllCheckList(checkListData: any): Promise<GetAllCheckListResponse | CoreException>;
    updateCheckListById(checkListId: string, updateData: any): Promise<UpdateCheckListResponse | CoreException>;
    deleteCheckListById(checkListId: string): Promise<DeleteCheckListResponse | CoreException>;
}