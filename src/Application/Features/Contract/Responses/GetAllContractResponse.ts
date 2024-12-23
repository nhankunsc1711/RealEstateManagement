import {BaseResponse} from "../../../Common/Model/Response/BaseResponse";
import  { Types } from "mongoose";

export class GetAllContractResponse extends BaseResponse {
    private data: {
        _id: string;
        name: string;
        type: string;
        description: string;
        guestId: Types.ObjectId;
        employeeId: Types.ObjectId;
        fileURL: string;
        issueDate: Date;
        expiryDate: Date;
    }[];
    constructor(
        message: string,
        statusCode: number,
        data: {
            _id: string;
            name: string;
            type: string;
            description: string;
            guestId: Types.ObjectId;
            employeeId: Types.ObjectId;
            fileURL: string;
            issueDate: Date;
            expiryDate: Date;
        }[],
        error?: string
    ){
        super(message, statusCode, data, error);
        this.data = data.map(contract => ({
            _id: contract._id,
            name: contract.name,
            type: contract.type,
            description: contract.description,
            guestId: contract.guestId,
            employeeId: contract.employeeId,
            fileURL: contract.fileURL,
            issueDate: contract.issueDate,
            expiryDate: contract.expiryDate,
        }));
    }
}