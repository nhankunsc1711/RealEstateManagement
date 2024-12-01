const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseSchema = require('./BaseModels');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserWithBaseSchema = new Schema({
    ...UserSchema.obj,
    ...BaseSchema.obj 
});

const UserWithBase = mongoose.model('UserWithBase', UserWithBaseSchema, 'users');

module.exports = { UserWithBase, UserSchema };
