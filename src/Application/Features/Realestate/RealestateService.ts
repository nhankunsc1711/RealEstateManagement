import IRealestateService from "../../Persistences/IServices/IRealestateService";
import IRealestateRepository from "../../Persistences/IRepositories/IRealestateRepository";

import RealestateRepository from "../../../Infrastructure/Persistences/Respositories/RealestateRepository";
import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateRealestateResponse} from "./Responses/CreateRealestateResponse";
import {GetRealestateResponse} from "./Responses/GetRealestateResponse";
import {GetAllRealestateResponse} from "./Responses/GetAllRealestateResponse";
import {UpdateRealestateResponse} from "./Responses/UpdateRealestateResponse";
import {DeleteRealestateResponse} from "./Responses/DeleteRealestateResponse";

import {RealestateWithBase} from "../../../Domain/Models/RealestateModel";

export default class RealestateService implements IRealestateService {
    private realestateRepository: IRealestateRepository = new RealestateRepository();

    async create(data: any): Promise<CreateRealestateResponse | CoreException> {
        const session = await this.realestateRepository.startTransaction();
        try {
            const result = await this.realestateRepository.createRealestate(data, session);

            await this.realestateRepository.commitTransaction();
            return new CreateRealestateResponse("Create Realestate Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getRealestateById(RealestateId: any): Promise<GetRealestateResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result: typeof RealestateWithBase | null = await this.realestateRepository.getRealestateById(RealestateId, query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Realestate not found");
            }
            return new GetRealestateResponse("Find Realestate Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllRealestate(): Promise<GetAllRealestateResponse | CoreException> {
        try {
            const query = {
                isActive: true,
                isDeleted: false
            }

            const result = await this.realestateRepository.getAllRealestates(query);
            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Realestate not found");
            }

            console.log("Result:", result);

            return new GetAllRealestateResponse("Find All Realestate Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateRealestateById(RealestateId: any, updateData: any): Promise<UpdateRealestateResponse | CoreException> {
        try {
            const session = await this.realestateRepository.startTransaction();

            const result: typeof RealestateWithBase | null = await this.realestateRepository.updateRealestateById(RealestateId, updateData, session);
            await this.realestateRepository.commitTransaction();

            if (result == null) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Realestate not found");
            }

            return new UpdateRealestateResponse("Update Realestate Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteRealestateById(RealestateId: any): Promise<DeleteRealestateResponse | CoreException> {
        try {
            const session = await this.realestateRepository.startTransaction();

            const result: any = await this.realestateRepository.deleteRealestateById(RealestateId, session);

            await this.realestateRepository.commitTransaction();
            return new DeleteRealestateResponse("Delete Realestate Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.realestateRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}