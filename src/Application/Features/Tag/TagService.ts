import ITagService from "../../Persistences/IServices/ITagService";
import ITagRepository from "../../Persistences/IRepositories/ITagRepository";

import TagRepository from "../../../Infrastructure/Persistences/Respositories/TagRepository";
import {CoreException} from "../../Common/Exceptions/CoreException";
import {StatusCodeEnums} from "../../../Domain/Enums/StatusCodeEnums";
import {CreateTagResponse} from "./Responses/CreateTagResponse";
import {GetTagResponse} from "./Responses/GetTagResponse";
import {GetAllTagResponse} from "./Responses/GetAllTagResponse";
import {UpdateTagResponse} from "./Responses/UpdateTagResponse";
import {DeleteTagResponse} from "./Responses/DeleteTagResponse";


export default class TagService implements ITagService {
    private tagRepository: ITagRepository = new TagRepository();

    async create(data: any): Promise<CreateTagResponse | CoreException> {
        const session = await this.tagRepository.startTransaction();
        try {
            const result: any = await this.tagRepository.createTag(data, session);
            await this.tagRepository.commitTransaction();
            return new CreateTagResponse("Create Tag Success", StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.tagRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getTagById(tagId: string): Promise<GetTagResponse | CoreException> {
        try {
            const tagData = {
                _id: tagId,
                isActived: true,
                isDeleted: false
            }
            const tag: any = await this.tagRepository.getTagById(tagData);
            if (!tag || tag === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404, "Tag not found");
            }
            return new GetTagResponse("Find Tag Success", StatusCodeEnums.OK_200, tag);
        } catch (error: any) {
            await this.tagRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async getAllTag(tagData: any): Promise<GetAllTagResponse | CoreException> {
        try {
            const tag: any = await this.tagRepository.getAllTag(tagData);
            if (!tag || tag === undefined) {
                return new CoreException(StatusCodeEnums.NotFound_404,"Tag not found");
            }
            return new GetAllTagResponse("Find All Tag Success", StatusCodeEnums.OK_200, tag);
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateTagById(tagId: string, updateData: any): Promise<UpdateTagResponse | CoreException> {
        const session = await this.tagRepository.startTransaction();
        try {
            const tagData: any = {
                _id: tagId,
                isActived: true,
                isDeleted: false
            }
            const tag: any = await this.tagRepository.getTagById(tagData);
            if (!tag || tag === undefined) {
                return new CoreException(StatusCodeEnums.InternalServerError_500, "Tag not found!");
            }
            const result: any = await this.tagRepository.updateTagById(tagData, updateData, session);
            await this.tagRepository.commitTransaction();
            return new UpdateTagResponse("Update Tag Success", StatusCodeEnums.OK_200, result);

        } catch (error: any) {
            await this.tagRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async deleteTagById(tagId: string): Promise<DeleteTagResponse | CoreException> {
        const session = await this.tagRepository.startTransaction();
        try {
            const tagData: any = {
                _id: tagId,
                isActived: true,
                isDeleted: false
            }
            const tag: any = await this.tagRepository.getTagById(tagData);
            if (!tag || tag === undefined) {
                throw new CoreException(StatusCodeEnums.InternalServerError_500, "Tag not found!");
            }
            const result: any = await this.tagRepository.deleteTagById(tagData, session);

            await this.tagRepository.commitTransaction();
            return new DeleteTagResponse("Delete Tag Success", StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.tagRepository.abortTransaction();
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}