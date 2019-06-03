//Time interval for determining if a driver is out of serice (no updates) 
export const NO_SERVICE_INTERVAL_MILI = 10000;

//Limiting the number of drivers updated the map
export const MAX_NUM_DRIVERS = 10;

//Socket.io server in dev env
export const SOCKET_IO_SERVER_DEV = 'http://localhost:9000';

//Socket.io client interval for retrieving updates from the server
export const SOCKET_IO_INTERVAL_MILI = 100;