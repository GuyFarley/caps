'use strict';

const MessageClient = require('./lib/messageClient');
const Chance = require('chance');
const chance = new Chance();
const vendor = new MessageClient('acme vendor messages');

setInterval(() => {
  let order = {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  console.log('VENDOR: New order sent from', order.store);
  vendor.publish('PICKUP', { messageId: chance.guid(), order });
}, 4000);

vendor.subscribe('DELIVERED', (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload}`);
});

vendor.subscribe('RECEIVED', (payload) => {
  console.log(`Confirmed ${payload} received`);
});

