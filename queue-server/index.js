'use strict';

const Queue = require('./lib/server-queue');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

// instance of a listening Event Server at http://localhost:3002
const server = new Server(PORT);
const caps = server.of('/caps');
const messageQueue = new Queue();

// connect socket to caps namespace
caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace', socket.id);

  //replaces logEvent() function:
  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT', { event, time, payload });
  });

  // how to join a room
  socket.on('JOIN', (queueId) => {
    // console.log(queueId);
    // console.log(`Joined the ${queueId} room`);
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  // PICKUP
  socket.on('PICKUP', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.emit('PICKUP', payload);
  });

  // IN-TRANSIT
  socket.on('IN-TRANSIT', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    let message = currentQueue.store(payload.messageId);
    caps.emit('IN-TRANSIT', message);
  });

  // DELIVERED
  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    let message = currentQueue.store(payload.messageId);
    caps.emit('DELIVERED', message);
  });

  // RECEIVED
  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('no queue created for this message');
    }
    Object.keys(currentQueue.data).forEach(queueItem => {
      console.log('This happens', queueItem);
      let message = currentQueue.remove(payload.messageId);
      caps.to(payload.queueId).emit('RECEIVED', message);
    });
  });
});
