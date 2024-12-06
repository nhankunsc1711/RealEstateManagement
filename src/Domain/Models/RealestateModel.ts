import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseModels';

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
}

export const Realestate = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    address: {type: String},
    type: {type: String},
    area: {type: String},
    price: {type: Number},
    utilities: {type: String},
    employeeId: {type: Types.ObjectId, validate: {validator: isValidObjectId}},
    imagePath: {type: String},

})
const RealestateWithBaseSchema = new mongoose.Schema({
    ...Realestate.obj,
    ...BaseSchema.obj
})

export const RealestateWithBase = mongoose.model('RealestateWithBase', RealestateWithBaseSchema, 'realestates')