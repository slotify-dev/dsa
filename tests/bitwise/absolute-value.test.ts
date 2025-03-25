import { describe, it, expect } from 'bun:test';
import absoluteValue from '../../src/bitwise/absolute-value';

describe('absoluteValue', () => {
  it('should return the same value for positive numbers', () => {
    expect(absoluteValue(0)).toBe(0);
    expect(absoluteValue(1)).toBe(1);
    expect(absoluteValue(5)).toBe(5);
    expect(absoluteValue(10)).toBe(10);
    expect(absoluteValue(100)).toBe(100);
    expect(absoluteValue(1000)).toBe(1000);
    expect(absoluteValue(10000)).toBe(10000);
  });

  it('should return the positive value for negative numbers', () => {
    expect(absoluteValue(-1)).toBe(1);
    expect(absoluteValue(-5)).toBe(5);
    expect(absoluteValue(-10)).toBe(10);
    expect(absoluteValue(-100)).toBe(100);
    expect(absoluteValue(-1000)).toBe(1000);
    expect(absoluteValue(-10000)).toBe(10000);
  });

  it('should handle edge cases correctly', () => {
    // Maximum 32-bit signed integer
    expect(absoluteValue(2147483647)).toBe(2147483647);

    // Minimum 32-bit signed integer
    // Note: In two's complement, abs(-2^31) can't be represented as a positive 32-bit integer
    // because it would be 2^31, which is outside the range of a 32-bit signed integer
    // This is a known limitation of the algorithm
    const minInt32 = -2147483648;
    expect(absoluteValue(minInt32)).toBe(minInt32); // This is a limitation of the algorithm
  });

  it('should match the built-in Math.abs function for most values', () => {
    for (let i = -100; i <= 100; i++) {
      if (i !== -2147483648) { // Skip the edge case
        expect(absoluteValue(i)).toBe(Math.abs(i));
      }
    }

    // Test some random larger values
    const testValues = [1000, -1000, 10000, -10000, 100000, -100000, 1000000, -1000000];
    for (const value of testValues) {
      expect(absoluteValue(value)).toBe(Math.abs(value));
    }
  });
});