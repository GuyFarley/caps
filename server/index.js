'use strict';

const { Server } = require('socket.io');
const { io } = require('socket.io-client');

const PORT = process.env.PORT || 3002;

// instance of a listening Event Server at http://localhost:3002
const server = new Server(PORT);

// create a namespace "off of" our server
// same url, just at an endpoint:  http://localhost:3002/caps
const caps = server.of('/caps');

// connect socket to caps namespace
caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace', socket.id);

  // how to join a room
  socket.on('JOIN', (room) => {
    console.log(`You've joined the ${room} room!`);
    socket.join(room);
  });

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    logEvent('DELIVERED', payload);
  });

  // emit delivery info to vendor's room

});

function logEvent(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}