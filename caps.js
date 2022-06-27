'use strict';

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('./eventPool');
const vendorEvent = require('./vendor/vendorEvents');
// const driverEvent = require('./driver/driverEvents');

// require event handlers

// listens to all events in event pool
eventPool.on('ORDER', vendorEvent);
// eventPool.on('PICKUP', driverEvent);

// logs timestamp and payload of every event

setInterval(() => {
  let storeName = chance.word();
  eventPool.emit('ORDER', { storeName });
}, 3000);
