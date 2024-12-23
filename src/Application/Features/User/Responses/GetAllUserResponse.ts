import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import {Types} from "mongoose";

export class GetAllUserResponse extends BaseResponse {
    private data: {
        _id: string;
        username: string;
        password: string;
        fullName: string;
        address: string;
        phoneNumber: string;
        email: string
        roleId: Types.ObjectId;
    }[];
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            username: string;
            password: string;
            fullName: string;
            address: string;
            phoneNumber: string;
            email: string
            roleId: Types.ObjectId;
        }[], 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(user => ({
            _id: user._id,
            username: user.username,
            password: user.password,
            fullName: user.fullName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            email: user.email,
            roleId: user.roleId
        }));
    }
}