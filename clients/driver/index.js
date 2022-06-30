// 'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3002/caps');

// socket.on('PICKUP', driverEvent);

// function driverEvent(payload) {
//   setTimeout(() => {
//     console.log(`DRIVER: picked up order ${payload.orderId}`);
//     socket.emit('IN-TRANSIT', payload);
//   }, 1000);

//   setTimeout(() => {
//     console.log(`DRIVER: delivered order ${payload.orderId}`);
//     socket.emit('DELIVERED', payload);
//   }, 3000);
// }