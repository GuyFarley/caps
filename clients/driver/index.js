'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

socket.on('PICKUP', driverEvent);

function driverEvent(payload) {
  console.log(`DRIVER: picked up order ${payload.orderId}`);
  // could be two separate functions AND / OR use setInterval to simulate passage of time
  console.log(`DRIVER: delivered order ${payload.orderId}`);
  socket.emit('DELIVERED', payload);
}