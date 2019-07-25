'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        default: Date.now
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