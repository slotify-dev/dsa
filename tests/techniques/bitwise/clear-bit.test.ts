import { describe, it, expect } from 'bun:test';
import clearBit from '../../../src/techniques/bitwise/clear-bit';

describe('clearBit', () => {
  it('should clear the bit at the specified position', () => {
    // 10 in binary is 1010, clearing bit 1 should result in 1000 (8)
    expect(clearBit(10, 1)).toBe(8);
    
    // 15 in binary is 1111, clearing bit 0 should result in 1110 (14)
    expect(clearBit(15, 0)).toBe(14);
    
    // 15 in binary is 1111, clearing bit 3 should result in 0111 (7)
    expect(clearBit(15, 3)).toBe(7);
  });

  it('should not change the number if the bit is already cleared', () => {
    // 8 in binary is 1000, clearing bit 1 should still be 8
    expect(clearBit(8, 1)).toBe(8);
    
    // 0 in binary is 0, clearing any bit should still be 0
    expect(clearBit(0, 0)).toBe(0);
    expect(clearBit(0, 10)).toBe(0);
  });

  it('should handle clearing bits at higher positions', () => {
    // 256 in binary has bit 8 set, clearing it should result in 0
    expect(clearBit(256, 8)).toBe(0);
    
    // 65536 in binary has bit 16 set, clearing it should result in 0
    expect(clearBit(65536, 16)).toBe(0);
    
    // -2147483648 has bit 31 set (sign bit), clearing it should result in 0
    expect(clearBit(-2147483648, 31)).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    // -1 in binary is all 1s, clearing bit 0 should result in -2
    expect(clearBit(-1, 0)).toBe(-2);
    
    // -1 in binary is all 1s, clearing bit 31 should result in 2147483647
    expect(clearBit(-1, 31)).toBe(2147483647);
  });
});