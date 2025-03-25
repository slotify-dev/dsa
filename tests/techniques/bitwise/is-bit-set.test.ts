import { describe, it, expect } from 'bun:test';
import isBitSet from '../../../src/bitwise/is-bit-set';

describe('isBitSet', () => {
  it('should return true when the bit is set', () => {
    // 10 in binary is 1010
    expect(isBitSet(10, 1)).toBe(true);
    expect(isBitSet(10, 3)).toBe(true);

    // 15 in binary is 1111
    expect(isBitSet(15, 0)).toBe(true);
    expect(isBitSet(15, 1)).toBe(true);
    expect(isBitSet(15, 2)).toBe(true);
    expect(isBitSet(15, 3)).toBe(true);

    // Test with larger numbers
    expect(isBitSet(1 << 31, 31)).toBe(true);
  });

  it('should return false when the bit is not set', () => {
    // 10 in binary is 1010
    expect(isBitSet(10, 0)).toBe(false);
    expect(isBitSet(10, 2)).toBe(false);
    expect(isBitSet(10, 4)).toBe(false);

    // 8 in binary is 1000
    expect(isBitSet(8, 0)).toBe(false);
    expect(isBitSet(8, 1)).toBe(false);
    expect(isBitSet(8, 2)).toBe(false);

    // Test with 0
    expect(isBitSet(0, 0)).toBe(false);
    expect(isBitSet(0, 10)).toBe(false);
  });

  it('should handle negative numbers correctly', () => {
    // -1 in two's complement has all bits set
    expect(isBitSet(-1, 0)).toBe(true);
    expect(isBitSet(-1, 10)).toBe(true);
    expect(isBitSet(-1, 31)).toBe(true);

    // -2 in binary ends with 0
    expect(isBitSet(-2, 0)).toBe(false);
    expect(isBitSet(-2, 1)).toBe(true);
  });
});