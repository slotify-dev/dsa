import { describe, it, expect } from 'bun:test';
import { upperBound } from '../../../src/techniques/binary-search';

describe('upperBound', () => {
  it('should find the first element strictly greater than the target', () => {
    expect(upperBound([1, 3, 5, 5, 5, 7, 9], 5)).toBe(5);
    expect(upperBound([1, 3, 5, 5, 5, 7, 9], 6)).toBe(5);
    expect(upperBound([1, 3, 5, 5, 5, 7, 9], 4)).toBe(2);
  });

  it('should return array length if all elements are less than or equal to target', () => {
    expect(upperBound([1, 3, 5, 7, 9], 9)).toBe(5);
    expect(upperBound([1, 3, 5, 7, 9], 10)).toBe(5);
  });

  it('should return 0 if all elements are greater than target', () => {
    expect(upperBound([1, 3, 5, 7, 9], 0)).toBe(0);
  });

  it('should work with arrays of size 1', () => {
    expect(upperBound([5], 5)).toBe(1);
    expect(upperBound([5], 4)).toBe(0);
    expect(upperBound([5], 6)).toBe(1);
  });

  it('should work with empty arrays', () => {
    expect(upperBound([], 5)).toBe(0);
  });

  it('should work with duplicate elements', () => {
    expect(upperBound([1, 1, 1, 1, 1], 1)).toBe(5);
    expect(upperBound([1, 1, 1, 1, 1], 0)).toBe(0);
    expect(upperBound([1, 1, 1, 1, 1], 2)).toBe(5);
  });
});