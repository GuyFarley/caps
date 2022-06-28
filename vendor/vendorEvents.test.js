'use strict';

const eventPool = require('../eventPool');
const pickup = require('./vendorEvents');
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
    pickup({ store: 'Bend, OR' });
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', { store: 'Bend, OR' });
  });
});