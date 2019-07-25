'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    category: String,
    tag: String,
    amount: Number
});

var RecordSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['expense', 'income']
    },
    image: String,
    categories:[CategorySchema]
});

module.exports = mongoose.model('Record', RecordSchema);