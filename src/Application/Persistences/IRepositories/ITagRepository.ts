import { ClientSession } from "mongoose";
import { Tag, TagWithBase } from "../../../Domain/Models/TagModel";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";


export default interface ITagRepository extends IBaseUnitOfWork{
    createTag(tagData: any, session: ClientSession): Promise<typeof TagWithBase>;
    getTagById(tagData: any): Promise<typeof TagWithBase>;
    getAllTag(tagData: any): Promise<typeof TagWithBase[]>;
    updateTagById(tagData: any, queryData: any, session: ClientSession): Promise<typeof TagWithBase>;
    deleteTagById(tagData: any, session: ClientSession): any;
    getTagByTagName(tagData: any): Promise<typeof TagWithBase>;
}