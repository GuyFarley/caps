'use strict';

const eventPool = require('../eventPool');
const { delivered } = require('./vendorEvents');
// 2 params: 
// 1. path to the module mock, 
// 2. callback that returns an object, because the eventPool is an object (with 2 methods);
jest.mock('../eventPool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Vendor Event Tests', () => {
  test('Emit the PICKUP event', () => {
    setInterval({ orderId: '1234' });
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', { orderId: '1234' });
  });
});