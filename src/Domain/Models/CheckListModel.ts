import mongoose, { Types } from "mongoose";
import { BaseSchema } from "./BaseModels";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const CheckList = new mongoose.Schema({
    guestId:{type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    employeeId:{type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    realestateId: {type: Types.ObjectId,validate: {validator: isValidObjectId,}},
    appointmentDate:{type: Date,immutable: true,}
})

const CheckListWithBaseSchema = new mongoose.Schema({
    ...CheckList.obj,
    ...BaseSchema.obj
})

export const CheckListWithBase = mongoose.model("CheckListWithBase", CheckListWithBaseSchema, "checklists")