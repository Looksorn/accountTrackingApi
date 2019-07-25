'use strict';

var mongoose = require('mongoose'),
    Trans = mongoose.model('Transaction'),
    User = mongoose.model('User');

exports.showTransaction = function(req, res){
    Trans.find({}, function(err, trans) {
        if (err){
            res.send(err);
        }else{
            res.json(trans);
        }
    });
};

exports.showTransactionById = function(req, res){
    Trans.findById(req.params.Id, function(err, trans) {
      if (err)
        res.send(err);
      res.json(trans);
    });
};

exports.showRecentTransaction = function(req, res){
    Trans.find({})
        .sort({'transactionDateandTime': -1})
        .limit(1)
        .exec(function(err, trans) {
            if (err){
                res.send(err);
            }else{
                res.json(trans);
            }
    });
};

exports.showTransactionByDate = function(req, res){
    Trans.find({
        transactionDateandTime: {
            $gte: new Date(req.params.Date),
            $lte: new Date(req.params.Date+"T23:59:59.999Z")
        }})
        .sort({'transactionDateandTime': -1})
        .exec(function(err, trans) {
            if (err){
                res.send(err);
            }else{
                res.json(trans);
            }
    });
};

exports.createTransaction = function(req, res) {
    // const {headers, method, url} = req;
    // const body = req.body

    // console.log("Header: "+JSON.stringify(headers));
    // console.log("Method: "+method);
    // console.log("URL: "+url);
    console.log("Body: "+JSON.stringify(req.body));

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // const responseBody = { headers, method, url, body };
    // res.write(JSON.stringify(responseBody));
    // res.end();

    var utc = new Date(req.body.transactionDateandTime);
    utc.setHours( utc.getHours() + 7);
    console.log(utc);

    var transData = {
        transactionId: req.body.transactionId,
        transactionDateandTime: utc,
        payerAccountNumber: req.body.payerAccountNumber,
        payeeAccountNumber: req.body.payeeAccountNumber,
        type: null,
        totalAmount: Number(req.body.amount),
        type: "expense",
        categories: [{
            category: req.body.billPaymentRef1.toLowerCase(),
            amount: Number(req.body.amount)
        }]
    }

    var new_trans = new Trans(transData);
    let error_trans = new_trans.validateSync();
    // console.log("error_trans",error_trans.errors);
    if(error_trans!==undefined){
        console.log("category is null");
        new_trans.categories[0].category = "others";
    }
    new_trans.save(function(err, trans) {
        if (err){
            // console.log("send err");
            res.send(err);
        }
        console.log("send trans")
        // res.json(trans);
        console.log(trans);
        updateBalance(req.body.payerAccountNumber,req.body.transactionDateandTime);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(trans));
        res.end();
    });
};

exports.editTransaction = function(req, res) {
    Trans.findOneAndUpdate({_id: req.params.Id}, req.body, {new: true}, function(err, trans) {
        if (err)
            res.send(err);
        res.json(trans);
    });
};

exports.deleteTransaction = function(req, res) {
    Trans.findOneAndDelete({
        _id: req.params.Id
    }, function(err, trans) {
        if (err)
            res.send(err);
        res.json({ message: 'Transaction successfully deleted' });
    });
};

exports.groupByCategory = function(req, res) {
    var d = new Date();
    var n = d.getMonth();
    Trans.aggregate(
        [
            {
                $project: {
                    _id: 0,
                    categories: 1,
                    type: 1,
                    month: { $month: "$transactionDateandTime" }
                }
            },
            { 
                $match : { 
                    month : n+1
                } 
            },
            {
                $unwind: "$categories"
            },
            {
                $group: {
                    _id: "$categories.category",
                    "type": { "$first": "$type" },
                    sum: { $sum: "$categories.amount"},
                }
            }
        ],
        function(err,results) {
            if (err) throw err;
            // return results;
            res.json(results);
            console.log(results);
        }
    )
};

exports.showBalance = function(req, res) {
    User.findOne({
        userAccountNo: "0123456789"
    }, function(err, trans) {
        if (err){
            res.send(err);
        }else{
            res.json(trans);
        }
    });
};

exports.getIncomeExpense = function(req, res) {
    var d = new Date();
    var n = d.getMonth();
    Trans.aggregate(
        [
            {
                $project: {
                    _id: 0,
                    categories: 1,
                    type: 1,
                    month: { $month: "$transactionDateandTime" }
                }
            },
            { 
                $match : { 
                    month : n+1
                } 
            },
            {
                $unwind: "$categories"
            },
            {
                $group: {
                    _id: "$type",
                    sum: { $sum: "$categories.amount"},
                }
            }
        ],
        function(err,results) {
            if (err) throw err;
            // return results;
            res.json(results);
            console.log(results);
        }
    )
};


function totalAmountByType(trans,type,userID) {
    var total = 0;
    for (var i = 0; i < trans.length; i++) {
        for (var j = 0; j < trans[i]['categories'].length; j++) {
            if(trans[i]['payerAccountNumber']==userID&&trans[i]['type']==type)
            total += trans[i]['categories'][j].amount
        }
    }
    return total
}

function updateBalance(userID,date)  {
    Trans.find({}, function(err, trans) {

        var balance = totalAmountByType(trans,'income',userID)-totalAmountByType(trans,'expense',userID)
        var userData = {
            userAccountNo: userID,
            balance: balance,        
            updateTime: date
        }
        console.log(userData)
        User.findOne({ userAccountNo: userID }, async function(err, user) {
            if (err){
                return err;
            }else{
                console.log("test"+ user);
                var new_user = new User(userData);
                if(!user){
                    new_user.save();
                }
                else{
                    new_user._id = user._id
                    console.log("test2"+ new_user);
                    await User.remove({ _id: user._id });
                    await new_user.save();
                }

            }
        })
    });
}