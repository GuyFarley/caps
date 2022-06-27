'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

module.exports = (payload) => {
  payload = {
    store: payload.storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.city(),
  };
  console.log(payload);
  eventPool.emit('PICKUP', payload);
};