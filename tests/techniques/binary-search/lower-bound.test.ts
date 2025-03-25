import { describe, it, expect } from 'bun:test';
import { lowerBound } from '../../../src/techniques/binary-search';

describe('lowerBound', () => {
  it('should find the first element greater than or equal to the target', () => {
    expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 5)).toBe(2);
    expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 6)).toBe(5);
    expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 4)).toBe(2);
  });

  it('should return array length if all elements are smaller than target', () => {
    expect(lowerBound([1, 3, 5, 7, 9], 10)).toBe(5);
  });

  it('should return 0 if all elements are greater than or equal to target', () => {
    expect(lowerBound([1, 3, 5, 7, 9], 0)).toBe(0);
    expect(lowerBound([1, 3, 5, 7, 9], 1)).toBe(0);
  });

  it('should work with arrays of size 1', () => {
    expect(lowerBound([5], 5)).toBe(0);
    expect(lowerBound([5], 4)).toBe(0);
    expect(lowerBound([5], 6)).toBe(1);
  });

  it('should work with empty arrays', () => {
    expect(lowerBound([], 5)).toBe(0);
  });

  it('should work with duplicate elements', () => {
    expect(lowerBound([1, 1, 1, 1, 1], 1)).toBe(0);
    expect(lowerBound([1, 1, 1, 1, 1], 0)).toBe(0);
    expect(lowerBound([1, 1, 1, 1, 1], 2)).toBe(5);
  });
});