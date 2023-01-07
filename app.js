//Loading libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Loading modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./lib/connectMongoose');
require('./routes/api/advertisements');

var app = express();

//Global variable declaration
app.locals.title = 'NodePop';

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 * API route
 */
app.use('/api/advertisements', require('./routes/api/advertisements'));

/*
 *Website routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Error handler
app.use(function(err, req, res, next) {
  //Check if validation error
  if(err.array){
    err.status = 422;
    const errorInfo = err.array({ onlyFirstError: true}) [0]; 
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`
  }

  res.status(err.status || 500);

  //For API requests, error answers in JSON
  if(req.originalUrl.startsWith('/api/')){
    res.json({ error: err.message });
    return;
  }

  //Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Render the error page
  res.render('error');
});

module.exports = app;
