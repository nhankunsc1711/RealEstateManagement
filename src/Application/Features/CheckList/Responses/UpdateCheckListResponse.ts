import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class UpdateCheckListResponse extends BaseResponse {
    private data: {
        _id: string;
        guestId: Types.ObjectId;
        employeeId: Types.ObjectId;
        realestateId: Types.ObjectId;
        appointmentDate: Date;
    };
    constructor(message: string, 
        statusCode: number, 
        data: {
            _id: string;
            guestId: Types.ObjectId;
            employeeId: Types.ObjectId;
            realestateId: Types.ObjectId;
            appointmentDate: Date;
        }, 
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = {
            _id: data._id,
            guestId: data.guestId,
            employeeId: data.employeeId,
            realestateId: data.realestateId,
            appointmentDate: data.appointmentDate,
        };
    }
}