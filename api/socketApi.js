var amqp = require('amqplib/callback_api');
var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

// io.on('connection', (socket) => {
//     console.log('A user connected');
// });

// // initializting and connecting to the RabbitMQ drivers locations exchange
// amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
//   if (error0) {
//     console.log('Error trying to connect to RabbitMQ: ' + error0);
//     throw error0;
//   }
//   connection.createChannel(function(error1, channel) {
//     if (error1) {
//       console.log('Error trying to create RabbitMQ channel: ' + error1);
//       throw error1;
//     }
//     var exchange = 'drivers';
//     var key = 'drivers.update';

//     channel.assertQueue('', { exclusive: true }, function(error2, q) {
//       if (error2) {
//         throw error2;
//       }
//       console.log('RabbitMQ initialization completed. Waiting for drivers locations...');
//       channel.bindQueue(q.queue, exchange, key);
//       channel.consume(q.queue, function(msg) {
//         //console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
//       }, {
//         noAck: true
//       });
//     });
//   });
// });

io.on('connection', (client) => {
    client.on('subscribeToDrivers', (interval) => {
      console.log('client is subscribing to drivers location with interval ', interval);
      // initializting and connecting to the RabbitMQ drivers locations exchange
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
            console.log('RabbitMQ initialization completed. Waiting for drivers locations...');
            channel.bindQueue(q.queue, exchange, key);
            channel.consume(q.queue, function(msg) {
            setInterval(() => {
                var msgStr = msg.content.toString();
                client.emit('drivers', msgStr);
                //console.log(" [x] %s:'%s'", msg.fields.routingKey, msgStr);
            }, interval);
            }, {
            noAck: true
            });
        });
      });
    });
    });
  });


// io.on('connection', (client) => {
//     client.on('subscribeToDrivers', (interval) => {
//       console.log('client is subscribing to drivers location with interval ', interval);
//       setInterval(() => {
//         client.emit('drivers', new Date());
//       }, interval);
//     });
//   });

socketApi.sendNotification = () => {
    console.log('sending a notif via socket.io');
    io.sockets.emit('drivers', {msg: 'Hello World!'});
}

module.exports = socketApi;