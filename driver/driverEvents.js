'use strict';

const eventPool = require('../eventPool');

module.exports = (payload) => {
  let currentTime = new Date();
  console.log(`DRIVER: picked up order ${payload.orderId}`);
  let globalEvent = {
    event: 'in-transit',
    time: currentTime,
    payload: payload,
  };
  console.log('EVENT: ', globalEvent);
  console.log(`DRIVER: delivered order ${payload.orderId}`);
  eventPool.emit('DELIVERED', payload);
};
