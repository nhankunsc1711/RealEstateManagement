import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetAllCheckListResponse extends BaseResponse {
    private data: {
        _id: string;
        guestId: Types.ObjectId;
        employeeId: Types.ObjectId;
        realestateId: Types.ObjectId;
        appointmentDate: Date;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            guestId: Types.ObjectId;
            employeeId: Types.ObjectId;
            realestateId: Types.ObjectId;
            appointmentDate: Date;
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(checklist => ({
            _id: checklist._id,
            guestId: checklist.guestId,
            employeeId: checklist.employeeId,
            realestateId: checklist.realestateId,
            appointmentDate: checklist.appointmentDate,
        }));
    }
}