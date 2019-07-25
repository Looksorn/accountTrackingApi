'use strict';
module.exports = function(app) {
  var controller = require('../controllers/accountTrackingController');

    app.route('/transaction')
        .get(controller.showTransaction)
        .post(controller.createTransaction);

    app.route('/transaction/id/:Id')
        .get(controller.showTransactionById)
        .delete(controller.deleteTransaction);

    app.route('/transaction/recent')
        .get(controller.showRecentTransaction);

    app.route('/transaction/date/:Date')
        .get(controller.showTransactionByDate);

    app.route('/summary')
        .get(controller.groupByCategory);

//   app.route('/tasks')
//     .get(todoList.list_all_tasks)
//     .post(todoList.create_a_task);

//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};