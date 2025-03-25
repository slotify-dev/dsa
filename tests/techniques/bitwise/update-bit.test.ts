import { describe, it, expect } from 'bun:test';
import updateBit from '../../../src/bitwise/update-bit';

describe('updateBit', () => {
  it('should update the bit to 1', () => {
    // 8 in binary is 1000, updating bit 1 to 1 should result in 1010 (10)
    expect(updateBit(8, 1, 1)).toBe(10);

    // 0 in binary is 0, updating bit 3 to 1 should result in 1000 (8)
    expect(updateBit(0, 3, 1)).toBe(8);

    // 10 in binary is 1010, updating bit 1 to 1 should still be 10
    expect(updateBit(10, 1, 1)).toBe(10);
  });

  it('should update the bit to 0', () => {
    // 15 in binary is 1111, updating bit 0 to 0 should result in 1110 (14)
    expect(updateBit(15, 0, 0)).toBe(14);

    // 15 in binary is 1111, updating bit 3 to 0 should result in 0111 (7)
    expect(updateBit(15, 3, 0)).toBe(7);

    // 8 in binary is 1000, updating bit 1 to 0 should still be 8
    expect(updateBit(8, 1, 0)).toBe(8);
  });

  it('should handle updating bits at higher positions', () => {
    // 0 in binary is 0, updating bit 8 to 1 should result in 256
    expect(updateBit(0, 8, 1)).toBe(256);

    // 256 in binary has bit 8 set, updating it to 0 should result in 0
    expect(updateBit(256, 8, 0)).toBe(0);

    // 0 in binary is 0, updating bit 31 to 1 should result in -2147483648
    expect(updateBit(0, 31, 1)).toBe(-2147483648);

    // -2147483648 has bit 31 set, updating it to 0 should result in 0
    expect(updateBit(-2147483648, 31, 0)).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    // -1 in binary is all 1s, updating bit 0 to 0 should result in -2
    expect(updateBit(-1, 0, 0)).toBe(-2);

    // -2 in binary ends with 0, updating bit 0 to 1 should result in -1
    expect(updateBit(-2, 0, 1)).toBe(-1);
  });
});