// 'use strict';

// const eventPool = require('../../eventPool');
// const Chance = require('chance');
// const chance = new Chance();

// eventPool.on('DELIVERED', delivered);

// function delivered(payload) {
//   console.log(`VENDOR: Thank you for delivering order ${payload.orderId}`);
// }

// let order = {
//   store: chance.company(),
//   orderId: chance.guid(),
//   customer: chance.name(),
//   address: chance.city(),
// };

// setInterval(() => {
//   eventPool.emit('PICKUP', order);

// }, 3000);

// module.exports = delivered;