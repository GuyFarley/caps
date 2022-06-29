'use strict';

const MessageClient = require('./lib/messageClient');
const Chance = require('chance');
const chance = new Chance();
const vendor = new MessageClient();

setInterval(() => {
  let order = {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  console.log('New order sent from ', order.store);
  vendor.publish('PICKUP', { messageId: chance.guid(), order });
}, 3000);

setInterval(() => {
  let order = {
    store: '1-800-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  console.log('New order sent from ', order.store);
  vendor.publish('PICKUP', { messageId: chance.guid(), order });
}, 2000);

vendor.subscribe('RECEIVED', (payload) => {
  console.log(`Confirmed ${payload.orderId} received`);
});