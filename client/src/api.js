import openSocket from 'socket.io-client';
import * as constants from './Constants';

const socket = openSocket(constants.SOCKET_IO_SERVER_DEV);


function subscribeToDrivers(cb) {
    socket.on('drivers', data => cb(null, data));
    socket.emit('subscribeToDrivers', constants.SOCKET_IO_INTERVAL_MILI);
} 


export { subscribeToDrivers }