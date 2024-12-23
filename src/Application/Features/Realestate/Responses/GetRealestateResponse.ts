import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetRealestateResponse extends BaseResponse {
    private data: {
        _id: string;
        title: string;
        description: string;
        address: string;
        type: string;
        area: string;
        price: string;
        utilities: string;
        employeeId: Types.ObjectId;
        imagePath: string;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            title: string;
            description: string;
            address: string;
            type: string;
            area: string;
            price: string;
            utilities: string;
            employeeId: Types.ObjectId;
            imagePath: string;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            title: data.title,
            description: data.description,
            address: data.address,
            type: data.type,
            area: data.area,
            price: data.price,
            utilities: data.utilities,
            employeeId: data.employeeId,
            imagePath: data.imagePath
        };
    }
}