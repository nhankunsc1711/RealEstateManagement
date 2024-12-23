import { Tag, TagWithBase } from "../../../Domain/Models/TagModel";
import ITagRepository from "../../../Application/Persistences/IRepositories/ITagRepository";
import { BaseUnitOfWork } from './BaseUnitOfWork';
import mongoose, {ClientSession} from "mongoose";

class TagRepository extends BaseUnitOfWork implements ITagRepository{ constructor(){ super(); }

    private buildQuery(criteria: any): any {
      const query: any = {
          isDeleted: criteria.isDeleted,
          isActived: criteria.isActived,
      };
      if (criteria._id) {
        query._id = new mongoose.Types.ObjectId(criteria._id);
      }
      if (criteria.name){
        query.name = criteria.name;
      }
      return query;
    }


    async createTag(tagData: any, session: ClientSession): Promise<typeof TagWithBase>{
        try {
          const tag: any = await TagWithBase.create([{
              ...tagData
          }], {session});       
          return tag[0];
        }catch (error: any) {
          console.log("Error at Repository");
          throw new Error("Error at createTag in TagRepository: " + error.message);
        }
    }

    async getTagById(tagData: any): Promise<typeof TagWithBase>{
        try {
          const query = this.buildQuery(tagData);
          const tag: typeof TagWithBase[] = await TagWithBase.find(query);
          return tag[0];
        } catch (error: any) {
          throw new Error("Error at getTagById in TagRepository: " + error.meesage);
        }
    }

    async getAllTag(tagData: any): Promise<typeof TagWithBase[]>{
        try {
          const tag: typeof TagWithBase[] = await TagWithBase.find(tagData);
          return tag;
        } catch (error: any) {
          throw new Error("Error at getTagById in TagRepository: " + error.meesage);
        }
    }

    async updateTagById(tagData: any, tagUpdateData: any, session: ClientSession): Promise<typeof TagWithBase> {
      try {
        const query = this.buildQuery(tagData);
        const updateData: any = {
          ...tagUpdateData,
          updatedAt: Date.now()
        }
        const updatedTag: any = await TagWithBase.findOneAndUpdate(query, updateData, {
          session,
          new: true
        });
        if (!updatedTag) {
          throw new Error("Tag not found after update");
        }
        return updatedTag;
      } catch (error: any) {
        throw new Error("Error at updateTagById in TagRepository: " + error.message);
      }
    }

    async deleteTagById(tagData: any, session: ClientSession){
        try {
          const query = this.buildQuery(tagData);
          await TagWithBase.deleteOne(query, {session});
        } catch (error: any) {
          throw new Error("Error at deleteTagById in TagRepository: " + error.meesage);
        }
    }

    async getTagByTagName(tagData: any): Promise<typeof TagWithBase> {
        try {
            const query = this.buildQuery(tagData);
            const Tag: typeof TagWithBase[] = await TagWithBase.find(query);
            return Tag[0];
        } catch (error: any) {
            throw new Error("Error occured at getTagIdByTagName in TagRepository: " + error.message);
        }
    }
}

export default TagRepository;