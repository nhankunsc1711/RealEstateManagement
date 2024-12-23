import {Request, Response} from 'express';
import ITagService from "../../Application/Persistences/IServices/ITagService";
import TagService from "../../Application/Features/Tag/TagService";
import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {CreateTagRequest} from "../../Application/Features/Tag/Requests/CreateTagRequest";
import {FindAllTagRequest} from "../../Application/Features/Tag/Requests/FindAllTagRequest";
import {UpdateTagRequest} from "../../Application/Features/Tag/Requests/UpdateTagRequest";
import {FindTagByIdRequest} from "../../Application/Features/Tag/Requests/FindTagByIdRequest";
import {DeleteTagRequest} from "../../Application/Features/Tag/Requests/DeleteTagRequest";

import mongoose from "mongoose";
//import {TagPermissionEnums} from "../../Domain/Enums/TagPermissionEnums";


export default class TagController {
    private tagService: ITagService = new TagService();

    createTag = async (req: Request<CreateTagRequest, any, any>,res: Response) => {
        try {
            const {name, description} = req.body;

            const data = {
                name,
                description
            }
            const result = await this.tagService.create(data);

            return res.status(StatusCodeEnums.Created_201).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getAllTag = async (req: Request<FindAllTagRequest, any, any>,res: Response) => {
        try {
            const result = await this.tagService.getAllTag({});

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateTag = async (req: Request<UpdateTagRequest, any, any>, res: Response) => {
        try {
            const {tagId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid TagId'});
            }

            const {name, description} = req.body;
            const data = {
                name,
                description
            }
            const result: any = await this.tagService.updateTagById(tagId, data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    getTag = async (req: Request<FindTagByIdRequest, any, any>, res: Response) => {
        try {
            const {tagId} = req.params;
            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid TagId'});
            }

            const result: any = await this.tagService.getTagById(tagId);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

    deleteTag = async (req: Request<DeleteTagRequest, any, any>,res: Response) => {
        try {
            const {tagId} = req.params;

            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                return res.status(400).json({statusCode: 400,status: 'Bad Request',message: 'Invalid TagId'});
            }

            const result: any = await this.tagService.deleteTagById(tagId);
            return res.status(StatusCodeEnums.OK_200).json(result);
        }catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }

}
