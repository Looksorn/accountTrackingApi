'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userAccountNo: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    updateTime: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('User', UserSchema);