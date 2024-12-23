import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class GetTagResponse extends BaseResponse {
    private data: {
        _id: string;
        name: string;
        description: string;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            name: string;
            description: string;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            name: data.name,
            description: data.description,
        };
    }
}