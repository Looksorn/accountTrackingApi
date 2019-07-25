'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['shopping', 'food', 'transportation', 'entertainment', 'health', 'bill', 'salary', 'gift', 'others'],
        default: 'others'
    }
});

module.exports = mongoose.model('Transaction', TransSchema);