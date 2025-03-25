import { describe, it, expect } from 'bun:test';
import haveOppositeSigns from '../../src/bitwise/have-opposite-signs';

describe('haveOppositeSigns', () => {
  it('should return true when numbers have opposite signs', () => {
    expect(haveOppositeSigns(1, -1)).toBe(true);
    expect(haveOppositeSigns(5, -10)).toBe(true);
    expect(haveOppositeSigns(-5, 10)).toBe(true);
    expect(haveOppositeSigns(100, -200)).toBe(true);
    expect(haveOppositeSigns(-100, 200)).toBe(true);
  });

  it('should return false when both numbers are positive', () => {
    expect(haveOppositeSigns(1, 1)).toBe(false);
    expect(haveOppositeSigns(5, 10)).toBe(false);
    expect(haveOppositeSigns(100, 200)).toBe(false);
  });

  it('should return false when both numbers are negative', () => {
    expect(haveOppositeSigns(-1, -1)).toBe(false);
    expect(haveOppositeSigns(-5, -10)).toBe(false);
    expect(haveOppositeSigns(-100, -200)).toBe(false);
  });

  it('should handle zero correctly', () => {
    // Zero is considered positive in this context (sign bit is 0)
    expect(haveOppositeSigns(0, 5)).toBe(false);
    expect(haveOppositeSigns(0, -5)).toBe(true);
    expect(haveOppositeSigns(5, 0)).toBe(false);
    expect(haveOppositeSigns(-5, 0)).toBe(true);
    expect(haveOppositeSigns(0, 0)).toBe(false);
  });

  it('should handle edge cases correctly', () => {
    // Maximum 32-bit signed integer
    const maxInt32 = 2147483647;
    // Minimum 32-bit signed integer
    const minInt32 = -2147483648;

    expect(haveOppositeSigns(maxInt32, minInt32)).toBe(true);
    expect(haveOppositeSigns(maxInt32, maxInt32)).toBe(false);
    expect(haveOppositeSigns(minInt32, minInt32)).toBe(false);
  });
});