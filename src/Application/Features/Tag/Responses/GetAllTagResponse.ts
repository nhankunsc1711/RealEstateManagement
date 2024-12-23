import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class GetAllTagResponse extends BaseResponse {
    private data: {
        _id: string;
        name: string;
        description: string;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            name: string;
            description: string;
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(role => ({
            _id: role._id,
            name: role.name,
            description: role.description
        }));
    }
}