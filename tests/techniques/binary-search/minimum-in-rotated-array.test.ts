import { describe, it, expect } from 'bun:test';
import { minimumInRotatedArray } from '../../../src/techniques/binary-search';

describe('minimumInRotatedArray', () => {
  it('should find the minimum element in a rotated sorted array', () => {
    expect(minimumInRotatedArray([4, 5, 6, 7, 0, 1, 2])).toBe(0);
    expect(minimumInRotatedArray([3, 4, 5, 1, 2])).toBe(1);
    expect(minimumInRotatedArray([11, 13, 15, 17])).toBe(11);
  });

  it('should work with non-rotated arrays', () => {
    expect(minimumInRotatedArray([1, 2, 3, 4, 5])).toBe(1);
  });

  it('should work with arrays of size 1', () => {
    expect(minimumInRotatedArray([1])).toBe(1);
  });

  it('should work with arrays of size 2', () => {
    expect(minimumInRotatedArray([2, 1])).toBe(1);
    expect(minimumInRotatedArray([1, 2])).toBe(1);
  });

  it('should work with different rotation points', () => {
    expect(minimumInRotatedArray([4, 5, 6, 7, 0, 1, 2])).toBe(0);
    expect(minimumInRotatedArray([7, 0, 1, 2, 4, 5, 6])).toBe(0);
    expect(minimumInRotatedArray([2, 4, 5, 6, 7, 0, 1])).toBe(0);
    expect(minimumInRotatedArray([0, 1, 2, 4, 5, 6, 7])).toBe(0);
  });

  it('should work with arrays containing duplicate elements', () => {
    expect(minimumInRotatedArray([3, 3, 1, 3])).toBe(1);
    expect(minimumInRotatedArray([2, 2, 2, 0, 1])).toBe(0);
  });
});