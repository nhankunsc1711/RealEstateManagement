import ICheckListService from "../../Persistences/IServices/ICheckListService";

import ICheckListRepository from "../../Persistences/IRepositories/ICheckListRepository";
import CheckListRepository from "../../../Infrastructure/Persistences/Respositories/CheckListRepository";
import IRealestateRepository from "../../Persistences/IRepositories/IRealestateRepository";
import RealestateRepository from "../../../Infrastructure/Persistences/Respositories/RealestateRepository";

import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateCheckListResponse} from "./Responses/CreateCheckListResponse";
import {GetCheckListResponse} from "./Responses/GetCheckListResponse";
import {GetAllCheckListResponse} from "./Responses/GetAllCheckListResponse";
import {UpdateCheckListResponse} from "./Responses/UpdateCheckListResponse";
import {DeleteCheckListResponse} from "./Responses/DeleteCheckListResponse";


export default class CheckListService implements ICheckListService {
    private checkListRepository: ICheckListRepository = new CheckListRepository();
    private realestateRepository: IRealestateRepository = new RealestateRepository();

    async create(data: any): Promise<CreateCheckListResponse | CoreException> {
        const session = await this.checkListRepository.startTransaction();
        try {
            const realestateData: any = {
                _id: data.realestateId,
                isActived: true,
                isDeleted: false
            }
            const realestate: any = await this.realestateRepository.getRealestateById(realestateData);
            if (!realestate || realestate === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Realestate not found");
            }
            const checkListData: any = {
                guestId: data.guestId,
                employeeId: realestate.employeeId,
                realestateId: data.realestateId
            }
            const result: any = await this.checkListRepository.createCheckList(checkListData, session);
            await this.checkListRepository.commitTransaction();
            return new CreateCheckListResponse("Create CheckList Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.checkListRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getCheckListById(checkListId: string): Promise<GetCheckListResponse | CoreException> {
        try {
            const checkListData = {
                _id: checkListId,
                isActived: true,
                isDeleted: false
            }
            const checkList: any = await this.checkListRepository.getCheckListById(checkListData);
            if (!checkList || checkList === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "CheckList not found");
            }
            return new GetCheckListResponse("Find CheckList Success", StatusCodeEnums.OK_200, checkList);
        } catch (error: any) {
            await this.checkListRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllCheckList(checkListData: any): Promise<GetAllCheckListResponse | CoreException> {
        try {
            const checkList: any = await this.checkListRepository.getAllCheckList(checkListData);
            if (!checkList || checkList === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404,"CheckList not found");
            }
            return new GetAllCheckListResponse("Find All CheckList Success", StatusCodeEnums.OK_200, checkList);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateCheckListById(checkListId: string, updateData: any): Promise<UpdateCheckListResponse | CoreException> {
        const session = await this.checkListRepository.startTransaction();
        try {
            const checkListData: any = {
                _id: checkListId,
                isActived: true,
                isDeleted: false
            }
            const checkList: any = await this.checkListRepository.getCheckListById(checkListData);
            if (!checkList || checkList === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "CheckList not found!");
            }
            const result: any = await this.checkListRepository.updateCheckListById(checkListData, updateData, session);
            await this.checkListRepository.commitTransaction();
            return new UpdateCheckListResponse("Update CheckList Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.checkListRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteCheckListById(checkListId: string): Promise<DeleteCheckListResponse | CoreException> {
        const session = await this.checkListRepository.startTransaction();
        try {
            const checkListData: any = {
                _id: checkListId,
                isActived: true,
                isDeleted: false
            }
            const checkList: any = await this.checkListRepository.getCheckListById(checkListData);
            if (!checkList || checkList === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "CheckList not found!");
            }
            const result: any = await this.checkListRepository.deleteCheckListById(checkListData, session);

            await this.checkListRepository.commitTransaction();
            return new DeleteCheckListResponse("Delete CheckList Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.checkListRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}