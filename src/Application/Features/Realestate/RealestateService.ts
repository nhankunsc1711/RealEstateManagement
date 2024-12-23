import IRealestateService from "../../Persistences/IServices/IRealestateService";

import IRealestateRepository from "../../Persistences/IRepositories/IRealestateRepository";
import RealestateRepository from "../../../Infrastructure/Persistences/Respositories/RealestateRepository";
import ITagRepository from "../../Persistences/IRepositories/ITagRepository";
import TagRepository from "../../../Infrastructure/Persistences/Respositories/TagRepository";

import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateRealestateResponse} from "./Responses/CreateRealestateResponse";
import {GetRealestateResponse} from "./Responses/GetRealestateResponse";
import {GetAllRealestateResponse} from "./Responses/GetAllRealestateResponse";
import {UpdateRealestateResponse} from "./Responses/UpdateRealestateResponse";
import {DeleteRealestateResponse} from "./Responses/DeleteRealestateResponse";


export default class RealestateService implements IRealestateService {
    private realestateRepository: IRealestateRepository = new RealestateRepository();
    private tagRepository: ITagRepository = new TagRepository();

    async create(data: any): Promise<CreateRealestateResponse | CoreException> {
        const session = await this.realestateRepository.startTransaction();
        try {
            const {tagName, ...restData} =  data;
            const tagData: any = {
                name: tagName,
                isActived: true,
                isDeleted: false
            }

            const tagIdResult: any = await this.tagRepository.getTagByTagName(tagData);
            console.log('tagIdResult', tagIdResult);
            if (!tagIdResult || tagIdResult === undefined) return new CoreException(StatusCodeEnums.BadRequest_400, `Error occured with tag`);
            const createRealestateData: any = {
                tagId: tagIdResult._id,
                ...restData
            }

            const result: any = await this.realestateRepository.createRealestate(createRealestateData, session);
            await this.realestateRepository.commitTransaction();
            return new CreateRealestateResponse("Create Realestate Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getRealestateById(realestateId: string): Promise<GetRealestateResponse | CoreException> {
        try {
            const realestateData = {
                _id: realestateId,
                isActived: true,
                isDeleted: false
            }
            const realestate: any = await this.realestateRepository.getRealestateById(realestateData);
            if (!realestate || realestate === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Realestate not found");
            }
            return new GetRealestateResponse("Find Realestate Success", StatusCodeEnums.OK_200, realestate);
        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllRealestate(realestateData: any): Promise<GetAllRealestateResponse | CoreException> {
        try {
            const realestate: any = await this.realestateRepository.getAllRealestate(realestateData);
            if (!realestate || realestate === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Realestate not found");
            }
            return new GetAllRealestateResponse("Find All Realestate Success", StatusCodeEnums.OK_200, realestate);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateRealestateById(realestateId: string, updateData: any): Promise<UpdateRealestateResponse | CoreException> {
        const session = await this.realestateRepository.startTransaction();
        try {
            const realestateData: any = {
                _id: realestateId,
                isActived: true,
                isDeleted: false
            }
            const realestate: any = await this.realestateRepository.getRealestateById(realestateData);
            if (!realestate || realestate === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Realestate not found!");
            }
            const result: any = await this.realestateRepository.updateRealestateById(realestateData, updateData, session);
            await this.realestateRepository.commitTransaction();
            return new UpdateRealestateResponse("Update Realestate Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteRealestateById(realestateId: string): Promise<DeleteRealestateResponse | CoreException> {
        const session = await this.realestateRepository.startTransaction();
        try {
            const realestateData: any = {
                _id: realestateId,
                isActived: true,
                isDeleted: false
            }
            const realestate: any = await this.realestateRepository.getRealestateById(realestateData);
            if (!realestate || realestate === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Realestate not found!");
            }
            const result: any = await this.realestateRepository.deleteRealestateById(realestateData, session);

            await this.realestateRepository.commitTransaction();
            return new DeleteRealestateResponse("Delete Realestate Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}