import { describe, it, expect } from 'bun:test';
import getLeastSignificantSetBit from '../../../src/techniques/bitwise/get-least-significant-set-bit';

describe('getLeastSignificantSetBit', () => {
  it('should return -1 for 0', () => {
    expect(getLeastSignificantSetBit(0)).toBe(-1);
  });

  it('should return the correct position for powers of 2', () => {
    expect(getLeastSignificantSetBit(1)).toBe(0);
    expect(getLeastSignificantSetBit(2)).toBe(1);
    expect(getLeastSignificantSetBit(4)).toBe(2);
    expect(getLeastSignificantSetBit(8)).toBe(3);
    expect(getLeastSignificantSetBit(16)).toBe(4);
    expect(getLeastSignificantSetBit(32)).toBe(5);
    expect(getLeastSignificantSetBit(64)).toBe(6);
    expect(getLeastSignificantSetBit(128)).toBe(7);
    expect(getLeastSignificantSetBit(256)).toBe(8);
    expect(getLeastSignificantSetBit(512)).toBe(9);
    expect(getLeastSignificantSetBit(1024)).toBe(10);
    expect(getLeastSignificantSetBit(2048)).toBe(11);
    expect(getLeastSignificantSetBit(4096)).toBe(12);
    expect(getLeastSignificantSetBit(8192)).toBe(13);
    expect(getLeastSignificantSetBit(16384)).toBe(14);
    expect(getLeastSignificantSetBit(32768)).toBe(15);
  });

  it('should return the correct position for non-powers of 2', () => {
    // 3 in binary is 11, LSB is at position 0
    expect(getLeastSignificantSetBit(3)).toBe(0);
    
    // 5 in binary is 101, LSB is at position 0
    expect(getLeastSignificantSetBit(5)).toBe(0);
    
    // 6 in binary is 110, LSB is at position 1
    expect(getLeastSignificantSetBit(6)).toBe(1);
    
    // 10 in binary is 1010, LSB is at position 1
    expect(getLeastSignificantSetBit(10)).toBe(1);
    
    // 12 in binary is 1100, LSB is at position 2
    expect(getLeastSignificantSetBit(12)).toBe(2);
    
    // 15 in binary is 1111, LSB is at position 0
    expect(getLeastSignificantSetBit(15)).toBe(0);
    
    // 20 in binary is 10100, LSB is at position 2
    expect(getLeastSignificantSetBit(20)).toBe(2);
  });

  it('should handle negative numbers correctly', () => {
    // -1 in binary is all 1s, LSB is at position 0
    expect(getLeastSignificantSetBit(-1)).toBe(0);
    
    // -2 in binary ends with 0, LSB is at position 1
    expect(getLeastSignificantSetBit(-2)).toBe(1);
    
    // -4 in binary ends with 00, LSB is at position 2
    expect(getLeastSignificantSetBit(-4)).toBe(2);
    
    // -8 in binary ends with 000, LSB is at position 3
    expect(getLeastSignificantSetBit(-8)).toBe(3);
  });
});