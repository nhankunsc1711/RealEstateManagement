export class UpdateTagRequest {
    public tagId : string;
    public name: string;
    public description: string;


    constructor(tagId: string, name: string, description: string) {
        this.tagId = tagId;
        this.name = name;
        this.description = description;
    }
}