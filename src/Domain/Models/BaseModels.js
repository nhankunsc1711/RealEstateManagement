const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaseSchema = new Schema({
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = { BaseSchema };
