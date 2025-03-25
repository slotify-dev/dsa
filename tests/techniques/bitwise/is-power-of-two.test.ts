import { describe, it, expect } from 'bun:test';
import isPowerOfTwo from '../../../src/techniques/bitwise/is-power-of-two';

describe('isPowerOfTwo', () => {
  it('should return false for 0', () => {
    expect(isPowerOfTwo(0)).toBe(false);
  });

  it('should return true for powers of 2', () => {
    expect(isPowerOfTwo(1)).toBe(true);
    expect(isPowerOfTwo(2)).toBe(true);
    expect(isPowerOfTwo(4)).toBe(true);
    expect(isPowerOfTwo(8)).toBe(true);
    expect(isPowerOfTwo(16)).toBe(true);
    expect(isPowerOfTwo(32)).toBe(true);
    expect(isPowerOfTwo(64)).toBe(true);
    expect(isPowerOfTwo(128)).toBe(true);
    expect(isPowerOfTwo(256)).toBe(true);
    expect(isPowerOfTwo(512)).toBe(true);
    expect(isPowerOfTwo(1024)).toBe(true);
    expect(isPowerOfTwo(2048)).toBe(true);
    expect(isPowerOfTwo(4096)).toBe(true);
    expect(isPowerOfTwo(8192)).toBe(true);
    expect(isPowerOfTwo(16384)).toBe(true);
    expect(isPowerOfTwo(32768)).toBe(true);
    expect(isPowerOfTwo(65536)).toBe(true);
    expect(isPowerOfTwo(1 << 30)).toBe(true); // 2^30
  });

  it('should return false for non-powers of 2', () => {
    expect(isPowerOfTwo(3)).toBe(false);
    expect(isPowerOfTwo(5)).toBe(false);
    expect(isPowerOfTwo(6)).toBe(false);
    expect(isPowerOfTwo(7)).toBe(false);
    expect(isPowerOfTwo(9)).toBe(false);
    expect(isPowerOfTwo(10)).toBe(false);
    expect(isPowerOfTwo(15)).toBe(false);
    expect(isPowerOfTwo(30)).toBe(false);
    expect(isPowerOfTwo(100)).toBe(false);
    expect(isPowerOfTwo(1023)).toBe(false);
    expect(isPowerOfTwo(1025)).toBe(false);
  });

  it('should return false for negative numbers', () => {
    expect(isPowerOfTwo(-1)).toBe(false);
    expect(isPowerOfTwo(-2)).toBe(false);
    expect(isPowerOfTwo(-4)).toBe(false);
    expect(isPowerOfTwo(-8)).toBe(false);
    expect(isPowerOfTwo(-16)).toBe(false);
    expect(isPowerOfTwo(-1024)).toBe(false);
  });
});