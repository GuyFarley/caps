'use strict';

const Chance = require('chance');
const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const clientRoom = 'vendor';

socket.emit('JOIN', clientRoom);

let order = {
  store: chance.company(),
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.city(),
};

setInterval(() => {
  console.log('Vendor: Order established', order.orderId);

  socket.emit('PICKUP', order);
}, 3000);