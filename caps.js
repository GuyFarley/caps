'use strict';

const eventPool = require('./eventPool');
require('./vendor/vendorEvents');
require('./driver/driverEvents');

// logs all events in event pool
eventPool.on('ORDER', (payload) => logger('ORDER', payload));
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload));

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
