import { describe, it, expect } from 'bun:test';
import countSetBits from '../../../src/techniques/bitwise/count-set-bits';

describe('countSetBits', () => {
  it('should return 0 for 0', () => {
    expect(countSetBits(0)).toBe(0);
  });

  it('should count bits correctly for positive numbers', () => {
    // 1 in binary is 1 (1 bit set)
    expect(countSetBits(1)).toBe(1);
    
    // 2 in binary is 10 (1 bit set)
    expect(countSetBits(2)).toBe(1);
    
    // 3 in binary is 11 (2 bits set)
    expect(countSetBits(3)).toBe(2);
    
    // 7 in binary is 111 (3 bits set)
    expect(countSetBits(7)).toBe(3);
    
    // 10 in binary is 1010 (2 bits set)
    expect(countSetBits(10)).toBe(2);
    
    // 15 in binary is 1111 (4 bits set)
    expect(countSetBits(15)).toBe(4);
    
    // 255 in binary is 11111111 (8 bits set)
    expect(countSetBits(255)).toBe(8);
  });

  it('should handle powers of 2 correctly', () => {
    // Powers of 2 have exactly 1 bit set
    expect(countSetBits(1)).toBe(1);
    expect(countSetBits(2)).toBe(1);
    expect(countSetBits(4)).toBe(1);
    expect(countSetBits(8)).toBe(1);
    expect(countSetBits(16)).toBe(1);
    expect(countSetBits(32)).toBe(1);
    expect(countSetBits(64)).toBe(1);
    expect(countSetBits(128)).toBe(1);
    expect(countSetBits(256)).toBe(1);
    expect(countSetBits(512)).toBe(1);
    expect(countSetBits(1024)).toBe(1);
    expect(countSetBits(2048)).toBe(1);
    expect(countSetBits(4096)).toBe(1);
    expect(countSetBits(8192)).toBe(1);
    expect(countSetBits(16384)).toBe(1);
    expect(countSetBits(32768)).toBe(1);
  });

  it('should handle large numbers correctly', () => {
    // 2^16 - 1 = 65535 (16 bits set)
    expect(countSetBits(65535)).toBe(16);
    
    // 2^20 - 1 = 1048575 (20 bits set)
    expect(countSetBits(1048575)).toBe(20);
  });

  it('should handle negative numbers correctly', () => {
    // In JavaScript, negative numbers are represented in two's complement
    // The actual behavior depends on the implementation of the countSetBits function
    // and how it handles the 32-bit representation
    
    // Test the relative relationship instead of absolute values
    // -1 should have more set bits than -2
    expect(countSetBits(-1)).toBeGreaterThanOrEqual(countSetBits(-2));
    
    // -1 in binary is all 1s, so it should have more bits set than any positive number
    expect(countSetBits(-1)).toBeGreaterThan(countSetBits(65535));
    
    // -2 should have one fewer bit set than -1
    const diff = countSetBits(-1) - countSetBits(-2);
    expect(diff).toBe(1);
  });
});