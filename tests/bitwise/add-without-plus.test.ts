import { describe, it, expect } from 'bun:test';
import addWithoutPlus from '../../src/bitwise/add-without-plus';

describe('addWithoutPlus', () => {
  it('should add two positive numbers correctly', () => {
    expect(addWithoutPlus(0, 0)).toBe(0);
    expect(addWithoutPlus(1, 1)).toBe(2);
    expect(addWithoutPlus(5, 3)).toBe(8);
    expect(addWithoutPlus(10, 20)).toBe(30);
    expect(addWithoutPlus(100, 200)).toBe(300);
    expect(addWithoutPlus(1234, 5678)).toBe(6912);
  });

  it('should add when one number is zero', () => {
    expect(addWithoutPlus(0, 5)).toBe(5);
    expect(addWithoutPlus(10, 0)).toBe(10);
  });

  it('should add negative numbers correctly', () => {
    expect(addWithoutPlus(-1, -1)).toBe(-2);
    expect(addWithoutPlus(-5, -3)).toBe(-8);
    expect(addWithoutPlus(-10, -20)).toBe(-30);
    expect(addWithoutPlus(-100, -200)).toBe(-300);
  });

  it('should add a positive and a negative number correctly', () => {
    expect(addWithoutPlus(5, -3)).toBe(2);
    expect(addWithoutPlus(-5, 3)).toBe(-2);
    expect(addWithoutPlus(10, -20)).toBe(-10);
    expect(addWithoutPlus(-10, 20)).toBe(10);
    expect(addWithoutPlus(100, -200)).toBe(-100);
    expect(addWithoutPlus(-100, 200)).toBe(100);
  });

  it('should handle edge cases correctly', () => {
    // Maximum 32-bit signed integer
    const maxInt32 = 2147483647;

    // Adding 1 to MAX_INT should result in MIN_INT
    expect(addWithoutPlus(maxInt32, 1)).toBe(-2147483648);

    // Adding -1 to MIN_INT should result in MAX_INT
    expect(addWithoutPlus(-2147483648, -1)).toBe(2147483647);
  });

  it('should match the built-in addition operator for various values', () => {
    const testCases = [
      [0, 0], [1, 1], [5, 3], [10, 20], [100, 200],
      [-1, -1], [-5, -3], [-10, -20], [-100, -200],
      [5, -3], [-5, 3], [10, -20], [-10, 20], [100, -200], [-100, 200]
    ];

    for (const [a, b] of testCases) {
      expect(addWithoutPlus(a, b)).toBe(a + b);
    }
  });
});