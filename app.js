'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

let fRot = require('file-stream-rotator'); 
let accessLogStream = fRot.getStream({filename:__dirname + "/log/access-%DATE%.log", frequency:"daily", verbose: false, date_format: "YYYY-MM-DD"});
var errorLogStream = fRot.getStream({filename:__dirname + "/log/error-%DATE%.log", frequency:"daily", verbose: false, date_format: "YYYY-MM-DD"});

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

// Postgres Promise Pacakage
var pgp = require('./db').pgp;
var QueryResultError = pgp.errors.QueryResultError;
var qrec = pgp.errors.queryResultErrorCode;

var app = express();
app.locals.AppName = "Geotree Web App";

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// - Production Code -
//app.use(require('morgan')('[:date][:remote-addr] - :method :url - (:status) :response-time', {stream: accessLogStream}));
//app.use(require('morgan')('[:date][:remote-addr] - :method :url - (:status) :response-time', {stream: errorLogStream, skip:(req, res) => {return res.statusCode < 400}}));

// - Development Code -
app.use(require('morgan')('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api', [require('./routes/points'), require('./routes/trees')]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if(err instanceof QueryResultError){
      console.log(err);
      if(err.code == qrec.noData){
        res.status(500);
        res.render('error', {
          message: "Nao foi devolvido nada.",
          error: "QREC.noData"
        });
      }
    } else{
      console.log(err);
      res.status(err.status || 500).json(err);  
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err.status
  });
});

module.exports = app;