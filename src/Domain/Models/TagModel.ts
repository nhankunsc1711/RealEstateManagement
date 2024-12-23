import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseModels';

export const Tag = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
})
const TagWithBaseSchema = new mongoose.Schema({
    ...Tag.obj,
    ...BaseSchema.obj
})

export const TagWithBase = mongoose.model('TagWithBase', TagWithBaseSchema, 'tags')