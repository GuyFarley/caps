'use strict';

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('./eventPool');
const { pickup, delivered } = require('./vendor/vendorEvents');
const driverEvent = require('./driver/driverEvents');

// listens to all events in event pool
eventPool.on('ORDER', pickup);
eventPool.on('PICKUP', driverEvent);
eventPool.on('DELIVERED', delivered);

setInterval(() => {
  let storeName = chance.word();
  eventPool.emit('ORDER', { storeName });
}, 3000);
