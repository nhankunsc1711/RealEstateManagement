import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";

export class DeleteTagResponse extends BaseResponse {
    private data: any;

    constructor(message: string, statusCode: number, data: {}, error?: string) {
        super(message, statusCode, data, error);
        this.data = data;
    }
}