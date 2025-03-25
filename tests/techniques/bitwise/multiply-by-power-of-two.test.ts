import { describe, it, expect } from 'bun:test';
import multiplyByPowerOfTwo from '../../../src/techniques/bitwise/multiply-by-power-of-two';

describe('multiplyByPowerOfTwo', () => {
  it('should multiply by 2^0 correctly', () => {
    // Multiplying by 2^0 = 1 should return the same number
    expect(multiplyByPowerOfTwo(0, 0)).toBe(0);
    expect(multiplyByPowerOfTwo(1, 0)).toBe(1);
    expect(multiplyByPowerOfTwo(5, 0)).toBe(5);
    expect(multiplyByPowerOfTwo(10, 0)).toBe(10);
    expect(multiplyByPowerOfTwo(100, 0)).toBe(100);
    expect(multiplyByPowerOfTwo(-1, 0)).toBe(-1);
    expect(multiplyByPowerOfTwo(-5, 0)).toBe(-5);
    expect(multiplyByPowerOfTwo(-10, 0)).toBe(-10);
  });

  it('should multiply by powers of 2 correctly for positive numbers', () => {
    // Multiplying by 2^1 = 2
    expect(multiplyByPowerOfTwo(1, 1)).toBe(2);
    expect(multiplyByPowerOfTwo(5, 1)).toBe(10);
    expect(multiplyByPowerOfTwo(10, 1)).toBe(20);
    
    // Multiplying by 2^2 = 4
    expect(multiplyByPowerOfTwo(1, 2)).toBe(4);
    expect(multiplyByPowerOfTwo(5, 2)).toBe(20);
    expect(multiplyByPowerOfTwo(10, 2)).toBe(40);
    
    // Multiplying by 2^3 = 8
    expect(multiplyByPowerOfTwo(1, 3)).toBe(8);
    expect(multiplyByPowerOfTwo(5, 3)).toBe(40);
    expect(multiplyByPowerOfTwo(10, 3)).toBe(80);
    
    // Multiplying by 2^4 = 16
    expect(multiplyByPowerOfTwo(1, 4)).toBe(16);
    expect(multiplyByPowerOfTwo(5, 4)).toBe(80);
    expect(multiplyByPowerOfTwo(10, 4)).toBe(160);
  });

  it('should multiply by powers of 2 correctly for negative numbers', () => {
    // Multiplying by 2^1 = 2
    expect(multiplyByPowerOfTwo(-1, 1)).toBe(-2);
    expect(multiplyByPowerOfTwo(-5, 1)).toBe(-10);
    expect(multiplyByPowerOfTwo(-10, 1)).toBe(-20);
    
    // Multiplying by 2^2 = 4
    expect(multiplyByPowerOfTwo(-1, 2)).toBe(-4);
    expect(multiplyByPowerOfTwo(-5, 2)).toBe(-20);
    expect(multiplyByPowerOfTwo(-10, 2)).toBe(-40);
    
    // Multiplying by 2^3 = 8
    expect(multiplyByPowerOfTwo(-1, 3)).toBe(-8);
    expect(multiplyByPowerOfTwo(-5, 3)).toBe(-40);
    expect(multiplyByPowerOfTwo(-10, 3)).toBe(-80);
  });

  it('should handle multiplying by zero correctly', () => {
    expect(multiplyByPowerOfTwo(0, 1)).toBe(0);
    expect(multiplyByPowerOfTwo(0, 2)).toBe(0);
    expect(multiplyByPowerOfTwo(0, 3)).toBe(0);
    expect(multiplyByPowerOfTwo(0, 10)).toBe(0);
  });

  it('should handle edge cases correctly', () => {
    // Maximum 32-bit signed integer
    const maxInt32 = 2147483647;
    
    // Multiplying MAX_INT by 2 should result in -2
    expect(multiplyByPowerOfTwo(maxInt32, 1)).toBe(-2);
    
    // Multiplying 1073741824 (2^30) by 2 should result in -2147483648 (MIN_INT)
    expect(multiplyByPowerOfTwo(1073741824, 1)).toBe(-2147483648);
  });

  it('should match the result of multiplying by the actual power of 2', () => {
    const testCases = [
      [0, 0], [1, 0], [5, 0], [10, 0], [-1, 0], [-5, 0],
      [0, 1], [1, 1], [5, 1], [10, 1], [-1, 1], [-5, 1],
      [0, 2], [1, 2], [5, 2], [10, 2], [-1, 2], [-5, 2],
      [0, 3], [1, 3], [5, 3], [10, 3], [-1, 3], [-5, 3],
      [0, 4], [1, 4], [5, 4], [10, 4], [-1, 4], [-5, 4]
    ];
    
    for (const [num, k] of testCases) {
      expect(multiplyByPowerOfTwo(num, k)).toBe(num * Math.pow(2, k));
    }
  });
});