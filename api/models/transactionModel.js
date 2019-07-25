'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const moment = require('moment-timezone');
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

// console.log(dateThailand);

var CategorySchema = new Schema({
    category: {
        type: String,
        enum: ['shopping', 'food', 'transportation', 'entertainment', 'health', 'bill', 'salary', 'gift', 'others']
    },
    tag: String,
    amount: Number
});

var TransSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    transactionDateandTime: {
        type: Date,
        // default: dateThailand
    },
    payerAccountNumber: {
        type: String,
        required: true
    },
    payeeAccountNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['expense', 'income']
    },
    totalAmount: {
        type: Number,
        required: true
    },
    categories: [CategorySchema]
});

module.exports = mongoose.model('Transaction', TransSchema);