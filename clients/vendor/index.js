'use strict';

const Chance = require('chance');
const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

setInterval(() => {
  let order = {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.city(),
  };
  console.log('VENDOR: Order established', order.orderId);

  const clientRoom = order.store;
  socket.emit('JOIN', clientRoom);

  socket.emit('PICKUP', order);
}, 3000);