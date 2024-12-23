import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseModels";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const Contract = new mongoose.Schema({
    name:{type: String},
    type:{type: String},
    description:{type: String},
    guestId:{type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    employeeId:{type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    realestateId: {type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    fileURL:{type: String},
    issueDate:{type: Date,immutable: true,},
    expiryDate:{type: Date,immutable: true,}
})

const ContractWithBaseSchema = new mongoose.Schema({
    ...Contract.obj,
    ...BaseSchema.obj
})

export const ContractWithBase = mongoose.model("ContractWithBase", ContractWithBaseSchema, "contracts")