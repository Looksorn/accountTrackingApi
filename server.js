var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Trans = require('./api/models/transactionModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/accountTrackingdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/accountTrackingRoutes'); //importing route
routes(app); //register the route

app.listen(port);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('Account tracking RESTful API server started on: ' + port);