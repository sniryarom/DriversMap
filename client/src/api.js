import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000');
const interval = 100;

function subscribeToDrivers(cb) {
    socket.on('drivers', timestamp => cb(null, timestamp));
    socket.emit('subscribeToDrivers', interval);
} 


export { subscribeToDrivers }