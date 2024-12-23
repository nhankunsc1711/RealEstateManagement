import {CreateTagResponse} from "../../Features/Tag/Responses/CreateTagResponse";
import {GetTagResponse} from "../../Features/Tag/Responses/GetTagResponse";
import {GetAllTagResponse} from "../../Features/Tag/Responses/GetAllTagResponse";
import {UpdateTagResponse} from "../../Features/Tag/Responses/UpdateTagResponse";
import {DeleteTagResponse} from "../../Features/Tag/Responses/DeleteTagResponse";
import { CoreException } from "../../Common/Exceptions/CoreException";

export default interface ITagService {
    create(data: any): Promise<CreateTagResponse | CoreException>;
    getTagById(tagId: string): Promise<GetTagResponse | CoreException>;
    getAllTag(tagData: any): Promise<GetAllTagResponse | CoreException>;
    updateTagById(tagId: string, updateData: any): Promise<UpdateTagResponse | CoreException>;
    deleteTagById(tagId: string): Promise<DeleteTagResponse | CoreException>;
}