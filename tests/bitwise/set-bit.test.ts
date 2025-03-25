import { describe, it, expect } from 'bun:test';
import setBit from '../../src/bitwise/set-bit';

describe('setBit', () => {
  it('should set the bit at the specified position', () => {
    // 8 in binary is 1000, setting bit 1 should result in 1010 (10)
    expect(setBit(8, 1)).toBe(10);

    // 0 in binary is 0, setting bit 3 should result in 1000 (8)
    expect(setBit(0, 3)).toBe(8);

    // 5 in binary is 101, setting bit 2 should result in 101 (5)
    expect(setBit(5, 0)).toBe(5);

    // 15 in binary is 1111, setting any bit should still be 15
    expect(setBit(15, 0)).toBe(15);
    expect(setBit(15, 1)).toBe(15);
    expect(setBit(15, 2)).toBe(15);
    expect(setBit(15, 3)).toBe(15);
  });

  it('should handle setting bits at higher positions', () => {
    // Setting bit 8 in 0 should result in 256
    expect(setBit(0, 8)).toBe(256);

    // Setting bit 16 in 0 should result in 65536
    expect(setBit(0, 16)).toBe(65536);

    // Setting bit 31 in 0 should result in -2147483648 (sign bit in 32-bit integer)
    expect(setBit(0, 31)).toBe(-2147483648);
  });

  it('should handle negative numbers correctly', () => {
    // -2 in binary ends with 0, setting bit 0 should result in -1
    expect(setBit(-2, 0)).toBe(-1);

    // -9 in binary ends with 111, setting bit 3 should result in -1
    expect(setBit(-9, 3)).toBe(-1);
  });
});