var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var amqp = require('amqplib/callback_api');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var driversRouter = require('./routes/drivers');

var app = express();

console.log('Express server started...');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drivers', driversRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
  if (error0) {
    console.log('Error trying to connect to RabbitMQ: ' + error0);
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      console.log('Error trying to create RabbitMQ channel: ' + error1);
      throw error1;
    }
    var exchange = 'drivers';
    var key = 'drivers.update';

    channel.assertQueue('', { exclusive: true }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');
      channel.bindQueue(q.queue, exchange, key);
      channel.consume(q.queue, function(msg) {
        //console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });
  });
});

module.exports = app;
