import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import {Types} from 'mongoose';

export class GetAllRealestateResponse extends BaseResponse {
    private data: {
        _id: string;
        title: string;
        description: string;
        address: string;
        tagId: string;
        area: string;
        price: string;
        utilities: string;
        employeeId: Types.ObjectId;
        imagePath: string;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            title: string;
            description: string;
            address: string;
            tagId: string;
            area: string;
            price: string;
            utilities: string;
            employeeId: Types.ObjectId;
            imagePath: string;
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(realestate => ({
            _id: realestate._id,
            title: realestate.title,
            description: realestate.description,
            address: realestate.address,
            tagId: realestate.tagId,
            area: realestate.area,
            price: realestate.price,
            utilities: realestate.utilities,
            employeeId: realestate.employeeId,
            imagePath: realestate.imagePath
        }));
    }
}