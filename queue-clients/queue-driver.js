'use strict';

const MessageClient = require('./lib/messageClient');
const driver = new MessageClient('driver messages');

driver.subscribe('PICKUP', (payload) => {
  console.log(`Received new order from ${payload.order.store}: ${payload.order.orderId}`);

  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.order.orderId}`);
    driver.publish('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.order.orderId}`);
    driver.publish('DELIVERED', payload);
  }, 2000);

  driver.publish('RECEIVED', payload);
});