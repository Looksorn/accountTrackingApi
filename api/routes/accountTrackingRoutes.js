'use strict';
module.exports = function(app) {
  var controller = require('../controllers/accountTrackingController');

    app.route('/transaction')
        .get(controller.showTransaction)
        .post(controller.createTransaction);

    app.route('/transaction/id/:Id')
        .get(controller.showTransactionById)
        .put(controller.editTransaction)
        .delete(controller.deleteTransaction);

    app.route('/transaction/recent')
        .get(controller.showRecentTransaction);

    app.route('/transaction/date/:Date')
        .get(controller.showTransactionByDate);

    app.route('/summary')
        .get(controller.groupByCategory);

    app.route('/inex')
        .get(controller.getIncomeExpense);

    app.route('/balance')
        .get(controller.showBalance);
};