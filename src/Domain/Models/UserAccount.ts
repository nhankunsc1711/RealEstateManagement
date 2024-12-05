import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseModels';

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
}

export const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullName: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    email: {type: String},
    roleId: {type: Types.ObjectId, validate: {validator: isValidObjectId}},
    imagePath: {type: String},

})
const UserWithBaseSchema = new mongoose.Schema({
    ...User.obj,
    ...BaseSchema.obj
})

export const UserWithBase = mongoose.model('UserWithBase', UserWithBaseSchema, 'users')