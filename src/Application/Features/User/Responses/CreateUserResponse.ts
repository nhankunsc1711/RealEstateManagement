import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import {Types} from "mongoose";

export class CreateUserResponse extends BaseResponse {
    private data: {
        _id: string;
        username: string;
        password: string;
        fullName: string;
        address: string;
        phoneNumber: string;
        email: string;
        roleId: Types.ObjectId;
    };
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
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            username: data.username,
            password: data.password,
            fullName: data.fullName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email,
            roleId: data.roleId
        };
    }
}