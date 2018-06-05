var express = require('express');
var mongoose = require("mongoose");
var fs = require('fs');
var router = express.Router();

var port = process.env.PORT || 8080;
var mongodb_connection_string = 'mongodb://amira:seat4book@ds245170.mlab.com:45170/booking-api';


var app = express();
mongoose.connect(mongodb_connection_string);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//models
fs.readdirSync(__dirname + "/app/models/").forEach(function(file) {
  require(__dirname + "/app/models/" + file);
});

// routes
var seatRouter = require(__dirname+'/app/controllers/seat.js')
var userRouter = require(__dirname+'/app/controllers/user.js')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/seats', seatRouter)
app.use('/users', userRouter)

// app.use('/seats', usersRouter);


app.listen(port, ()=>{
  console.log('listening on port ' + port);
});
