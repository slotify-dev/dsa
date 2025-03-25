import { describe, it, expect } from 'bun:test';
import toggleBit from '../../../src/bitwise/toggle-bit';

describe('toggleBit', () => {
  it('should toggle the bit from 0 to 1', () => {
    // 8 in binary is 1000, toggling bit 1 should result in 1010 (10)
    expect(toggleBit(8, 1)).toBe(10);

    // 0 in binary is 0, toggling bit 3 should result in 1000 (8)
    expect(toggleBit(0, 3)).toBe(8);
  });

  it('should toggle the bit from 1 to 0', () => {
    // 15 in binary is 1111, toggling bit 0 should result in 1110 (14)
    expect(toggleBit(15, 0)).toBe(14);

    // 15 in binary is 1111, toggling bit 3 should result in 0111 (7)
    expect(toggleBit(15, 3)).toBe(7);

    // 10 in binary is 1010, toggling bit 1 should result in 1000 (8)
    expect(toggleBit(10, 1)).toBe(8);
  });

  it('should handle toggling bits at higher positions', () => {
    // 0 in binary is 0, toggling bit 8 should result in 256
    expect(toggleBit(0, 8)).toBe(256);

    // 256 in binary has bit 8 set, toggling it should result in 0
    expect(toggleBit(256, 8)).toBe(0);

    // 0 in binary is 0, toggling bit 31 should result in -2147483648
    expect(toggleBit(0, 31)).toBe(-2147483648);

    // -2147483648 has bit 31 set, toggling it should result in 0
    expect(toggleBit(-2147483648, 31)).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    // -1 in binary is all 1s, toggling bit 0 should result in -2
    expect(toggleBit(-1, 0)).toBe(-2);

    // -2 in binary ends with 0, toggling bit 0 should result in -1
    expect(toggleBit(-2, 0)).toBe(-1);
  });
});