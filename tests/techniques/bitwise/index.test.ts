import { describe, it, expect } from 'bun:test';
import * as Bitwise from '../../../src/techniques/bitwise';

describe('Bitwise module exports', () => {
  it('should export all bitwise functions', () => {
    // Check that all expected functions are exported
    expect(typeof Bitwise.isBitSet).toBe('function');
    expect(typeof Bitwise.setBit).toBe('function');
    expect(typeof Bitwise.clearBit).toBe('function');
    expect(typeof Bitwise.toggleBit).toBe('function');
    expect(typeof Bitwise.updateBit).toBe('function');
    expect(typeof Bitwise.countSetBits).toBe('function');
    expect(typeof Bitwise.isPowerOfTwo).toBe('function');
    expect(typeof Bitwise.getLeastSignificantSetBit).toBe('function');
    expect(typeof Bitwise.getMostSignificantSetBit).toBe('function');
    expect(typeof Bitwise.reverseBits).toBe('function');
    expect(typeof Bitwise.swapWithoutTemp).toBe('function');
    expect(typeof Bitwise.absoluteValue).toBe('function');
    expect(typeof Bitwise.haveOppositeSigns).toBe('function');
    expect(typeof Bitwise.addWithoutPlus).toBe('function');
    expect(typeof Bitwise.multiplyByPowerOfTwo).toBe('function');
    expect(typeof Bitwise.divideByPowerOfTwo).toBe('function');
    expect(typeof Bitwise.nextPowerOfTwo).toBe('function');
  });
});