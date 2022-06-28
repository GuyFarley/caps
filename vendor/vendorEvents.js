'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

function pickup(payload) {
  payload = {
    store: payload.storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.city(),
  };
  let currentTime = new Date();
  let globalEvent = {
    event: 'pickup',
    time: currentTime,
    payload: payload,
  };
  console.log('EVENT: ', globalEvent);
  eventPool.emit('PICKUP', payload);
}

function delivered(payload) {
  let currentTime = new Date();
  let globalEvent = {
    event: 'delivered',
    time: currentTime,
    payload: payload,
  };
  console.log(`VENDOR: Thank you for delivering order ${payload.orderId}`);
  console.log('EVENT: ', globalEvent);
}

module.exports = {
  pickup,
  delivered,
};