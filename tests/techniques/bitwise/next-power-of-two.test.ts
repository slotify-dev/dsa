import { describe, it, expect } from 'bun:test';
import nextPowerOfTwo from '../../../src/techniques/bitwise/next-power-of-two';

describe('nextPowerOfTwo', () => {
  it('should return 1 for 0 and negative numbers', () => {
    expect(nextPowerOfTwo(0)).toBe(1);
    expect(nextPowerOfTwo(-1)).toBe(1);
    expect(nextPowerOfTwo(-5)).toBe(1);
    expect(nextPowerOfTwo(-10)).toBe(1);
    expect(nextPowerOfTwo(-100)).toBe(1);
  });

  it('should return the same number if it is already a power of 2', () => {
    expect(nextPowerOfTwo(1)).toBe(1);
    expect(nextPowerOfTwo(2)).toBe(2);
    expect(nextPowerOfTwo(4)).toBe(4);
    expect(nextPowerOfTwo(8)).toBe(8);
    expect(nextPowerOfTwo(16)).toBe(16);
    expect(nextPowerOfTwo(32)).toBe(32);
    expect(nextPowerOfTwo(64)).toBe(64);
    expect(nextPowerOfTwo(128)).toBe(128);
    expect(nextPowerOfTwo(256)).toBe(256);
    expect(nextPowerOfTwo(512)).toBe(512);
    expect(nextPowerOfTwo(1024)).toBe(1024);
    expect(nextPowerOfTwo(2048)).toBe(2048);
    expect(nextPowerOfTwo(4096)).toBe(4096);
    expect(nextPowerOfTwo(8192)).toBe(8192);
    expect(nextPowerOfTwo(16384)).toBe(16384);
    expect(nextPowerOfTwo(32768)).toBe(32768);
    expect(nextPowerOfTwo(65536)).toBe(65536);
  });

  it('should return the next power of 2 for non-power-of-2 numbers', () => {
    expect(nextPowerOfTwo(3)).toBe(4);
    expect(nextPowerOfTwo(5)).toBe(8);
    expect(nextPowerOfTwo(6)).toBe(8);
    expect(nextPowerOfTwo(7)).toBe(8);
    expect(nextPowerOfTwo(9)).toBe(16);
    expect(nextPowerOfTwo(10)).toBe(16);
    expect(nextPowerOfTwo(15)).toBe(16);
    expect(nextPowerOfTwo(17)).toBe(32);
    expect(nextPowerOfTwo(31)).toBe(32);
    expect(nextPowerOfTwo(33)).toBe(64);
    expect(nextPowerOfTwo(63)).toBe(64);
    expect(nextPowerOfTwo(65)).toBe(128);
    expect(nextPowerOfTwo(127)).toBe(128);
    expect(nextPowerOfTwo(129)).toBe(256);
  });

  it('should handle larger numbers correctly', () => {
    expect(nextPowerOfTwo(1000)).toBe(1024);
    expect(nextPowerOfTwo(1023)).toBe(1024);
    expect(nextPowerOfTwo(1025)).toBe(2048);
    expect(nextPowerOfTwo(10000)).toBe(16384);
    expect(nextPowerOfTwo(65535)).toBe(65536);
    expect(nextPowerOfTwo(65537)).toBe(131072);
  });

  it('should handle edge cases correctly', () => {
    // Test with the largest power of 2 that can be represented in a 32-bit integer
    const largestPowerOf2In32Bit = 1 << 30; // 2^30 = 1073741824
    expect(nextPowerOfTwo(largestPowerOf2In32Bit)).toBe(largestPowerOf2In32Bit);
    
    // Test with a number just below the largest power of 2
    expect(nextPowerOfTwo(largestPowerOf2In32Bit - 1)).toBe(largestPowerOf2In32Bit);
    
    // Test with a number just above the largest power of 2
    // This would normally return 2^31, but that can't be represented as a positive 32-bit integer
    // The behavior might vary depending on the implementation
    const result = nextPowerOfTwo(largestPowerOf2In32Bit + 1);
    expect(result === -2147483648 || result === 0 || result === 2147483648).toBe(true);
  });
});