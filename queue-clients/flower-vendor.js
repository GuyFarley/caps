'use strict';

const MessageClient = require('./lib/messageClient');
const Chance = require('chance');
const chance = new Chance();
const vendor = new MessageClient('flower vendor messages');

setInterval(() => {
  let order = {
    store: '1-800-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  console.log('VENDOR: New order sent from', order.store);
  vendor.publish('PICKUP', { messageId: chance.guid(), order });
}, 3000);

vendor.subscribe('DELIVERED', (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload}`);
});

vendor.subscribe('RECEIVED', (payload) => {
  console.log(`Confirmed ${payload} received`);
});