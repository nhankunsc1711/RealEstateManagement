import { ClientSession } from "mongoose";
import { CheckList, CheckListWithBase } from "../../../Domain/Models/CheckListModel";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";


export default interface ICheckListRepository extends IBaseUnitOfWork{
    createCheckList(checkListData: any, session: ClientSession): Promise<typeof CheckListWithBase>;
    getCheckListById(checkListData: any): Promise<typeof CheckListWithBase>;
    getAllCheckList(checkListData: any): Promise<typeof CheckListWithBase[]>;
    updateCheckListById(checkListData: any, queryData: any, session: ClientSession): Promise<typeof CheckListWithBase>;
    deleteCheckListById(checkListData: any, session: ClientSession): any;
}