'use strict';
module.exports = function(app) {
  var controller = require('../controllers/accountTrackingController');

    app.route('/transaction')
        .get(controller.showTransaction)
        .post(controller.createTransaction);

    app.route('/transaction/:ID')
        .delete(controller.deleteTransaction);

    app.route('/record')
        .get(controller.showRecord);

//   app.route('/tasks')
//     .get(todoList.list_all_tasks)
//     .post(todoList.create_a_task);

//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};