'use strict';

var mongoose = require('mongoose'),
    Trans = mongoose.model('Transaction');

exports.showTransaction = function(req, res){
    console.log("Body: "+JSON.stringify(req.body));
    Trans.find({}, function(err, trans) {
        if (err){
            res.send(err);
        }else{
            res.json(trans);
        }
    });
};

exports.showTransactionByDate = function(req, res){
    console.log("Body: "+JSON.stringify(req.body));
    Trans.find({}, function(err, trans) {
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

    var transData = {
        transactionId: req.body.transactionId,
        transactionDateandTime: new Date(req.body.transactionDateandTime),
        payerAccountNumber: req.body.payerAccountNumber,
        payeeAccountNumber: req.body.payeeAccountNumber,
        totalAmount: Number(req.body.amount),
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
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(trans));
        res.end();
    });
};

exports.deleteTransaction = function(req, res) {
    Trans.remove({
      _id: req.params.ID
    }, function(err, trans) {
      if (err)
        res.send(err);
      res.json({ message: 'Transaction successfully deleted' });
    });
};

// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//       if (err)
//         res.send(err);
//       res.json(task);
//     });
//   };
  
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//       if (err)
//         res.send(err);
//       res.json(task);
//     });
//   };

// exports.delete_a_task = function(req, res) {
//     Task.remove({
//       _id: req.params.taskId
//     }, function(err, task) {
//       if (err)
//         res.send(err);
//       res.json({ message: 'Task successfully deleted' });
//     });
// };