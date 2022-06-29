// 'use strict';

// const eventPool = require('../../eventPool');

// eventPool.on('PICKUP', driverEvent);

// function driverEvent(payload) {
//   console.log(`DRIVER: picked up order ${payload.orderId}`);
//   // could be two separate functions AND / OR use setInterval to simulate passage of time
//   console.log(`DRIVER: delivered order ${payload.orderId}`);
//   eventPool.emit('DELIVERED', payload);
// }