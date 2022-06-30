'use strict';

const MessageClient = require('./lib/messageClient');
const driver = new MessageClient('driver messages');

driver.subscribe('PICKUP', (payload) => {
  console.log(`DRIVER: Received new order from ${payload.order.store}: ${payload.order.orderId}`);

  setTimeout(() => {
    console.log(`DRIVER: Picked up order ${payload.order.orderId}`);
    driver.publish('IN-TRANSIT', payload);
  }, 4000);

  setTimeout(() => {
    console.log(`DRIVER: Delivered order ${payload.order.orderId}`);
    driver.publish('DELIVERED', payload);
  }, 6000);

  // driver.publish('RECEIVED', payload);
});