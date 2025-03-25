import { describe, it, expect } from 'bun:test';
import divideByPowerOfTwo from '../../../src/bitwise/divide-by-power-of-two';

describe('divideByPowerOfTwo', () => {
  it('should divide by 2^0 correctly', () => {
    // Dividing by 2^0 = 1 should return the same number
    expect(divideByPowerOfTwo(0, 0)).toBe(0);
    expect(divideByPowerOfTwo(1, 0)).toBe(1);
    expect(divideByPowerOfTwo(5, 0)).toBe(5);
    expect(divideByPowerOfTwo(10, 0)).toBe(10);
    expect(divideByPowerOfTwo(100, 0)).toBe(100);
    expect(divideByPowerOfTwo(-1, 0)).toBe(-1);
    expect(divideByPowerOfTwo(-5, 0)).toBe(-5);
    expect(divideByPowerOfTwo(-10, 0)).toBe(-10);
  });

  it('should divide by powers of 2 correctly for positive numbers', () => {
    // Dividing by 2^1 = 2
    expect(divideByPowerOfTwo(2, 1)).toBe(1);
    expect(divideByPowerOfTwo(10, 1)).toBe(5);
    expect(divideByPowerOfTwo(20, 1)).toBe(10);

    // Dividing by 2^2 = 4
    expect(divideByPowerOfTwo(4, 2)).toBe(1);
    expect(divideByPowerOfTwo(20, 2)).toBe(5);
    expect(divideByPowerOfTwo(40, 2)).toBe(10);

    // Dividing by 2^3 = 8
    expect(divideByPowerOfTwo(8, 3)).toBe(1);
    expect(divideByPowerOfTwo(40, 3)).toBe(5);
    expect(divideByPowerOfTwo(80, 3)).toBe(10);

    // Dividing by 2^4 = 16
    expect(divideByPowerOfTwo(16, 4)).toBe(1);
    expect(divideByPowerOfTwo(80, 4)).toBe(5);
    expect(divideByPowerOfTwo(160, 4)).toBe(10);
  });

  it('should handle integer division with truncation', () => {
    // 5 / 2 = 2.5, but integer division truncates to 2
    expect(divideByPowerOfTwo(5, 1)).toBe(2);

    // 7 / 4 = 1.75, but integer division truncates to 1
    expect(divideByPowerOfTwo(7, 2)).toBe(1);

    // 10 / 8 = 1.25, but integer division truncates to 1
    expect(divideByPowerOfTwo(10, 3)).toBe(1);

    // 100 / 64 = 1.5625, but integer division truncates to 1
    expect(divideByPowerOfTwo(100, 6)).toBe(1);
  });

  it('should divide by powers of 2 correctly for negative numbers', () => {
    // Dividing by 2^1 = 2
    expect(divideByPowerOfTwo(-2, 1)).toBe(-1);
    expect(divideByPowerOfTwo(-10, 1)).toBe(-5);
    expect(divideByPowerOfTwo(-20, 1)).toBe(-10);

    // Dividing by 2^2 = 4
    expect(divideByPowerOfTwo(-4, 2)).toBe(-1);
    expect(divideByPowerOfTwo(-20, 2)).toBe(-5);
    expect(divideByPowerOfTwo(-40, 2)).toBe(-10);

    // Dividing by 2^3 = 8
    expect(divideByPowerOfTwo(-8, 3)).toBe(-1);
    expect(divideByPowerOfTwo(-40, 3)).toBe(-5);
    expect(divideByPowerOfTwo(-80, 3)).toBe(-10);
  });

  it('should handle negative number division with rounding towards negative infinity', () => {
    // -5 / 2 = -2.5, but right shift rounds towards negative infinity to -3
    expect(divideByPowerOfTwo(-5, 1)).toBe(-3);

    // -7 / 4 = -1.75, but right shift rounds towards negative infinity to -2
    expect(divideByPowerOfTwo(-7, 2)).toBe(-2);

    // -10 / 8 = -1.25, but right shift rounds towards negative infinity to -2
    expect(divideByPowerOfTwo(-10, 3)).toBe(-2);
  });

  it('should handle dividing zero correctly', () => {
    expect(divideByPowerOfTwo(0, 1)).toBe(0);
    expect(divideByPowerOfTwo(0, 2)).toBe(0);
    expect(divideByPowerOfTwo(0, 3)).toBe(0);
    expect(divideByPowerOfTwo(0, 10)).toBe(0);
  });

  it('should handle edge cases correctly', () => {
    // Minimum 32-bit signed integer
    const minInt32 = -2147483648;

    // Dividing MIN_INT by 2 should result in -1073741824
    expect(divideByPowerOfTwo(minInt32, 1)).toBe(-1073741824);

    // Dividing MIN_INT by 2^31 should result in -1
    expect(divideByPowerOfTwo(minInt32, 31)).toBe(-1);
  });
});