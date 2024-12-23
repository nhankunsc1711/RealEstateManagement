import { BaseResponse } from './../../../Common/Model/Response/BaseResponse';

export class LoginResponse extends BaseResponse {
    private data: {
        accessToken: string;
        refreshToken: string;
    }
    
    constructor(message: string, statusCode: number, data: any, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }
}