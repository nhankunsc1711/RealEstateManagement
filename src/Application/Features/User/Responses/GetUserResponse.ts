import mongoose from 'mongoose';
import { BaseResponse } from '../../../Common/Model/Response/BaseResponse';

interface IUserProfile {
    _id: mongoose.Types.ObjectId,
}

export class GetUserResponse extends BaseResponse {
    private data: IUserProfile;

    constructor(message: string, statusCode: number, data: IUserProfile, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
        };
    }
}