import { describe, it, expect } from 'bun:test';
import { searchRotatedArray } from '../../../src/techniques/binary-search';

describe('searchRotatedArray', () => {
  it('should find the target in a rotated sorted array', () => {
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 4)).toBe(0);
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 2)).toBe(6);
  });

  it('should return -1 if target is not found', () => {
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 8)).toBe(-1);
  });

  it('should work with non-rotated arrays', () => {
    expect(searchRotatedArray([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(searchRotatedArray([1, 2, 3, 4, 5], 6)).toBe(-1);
  });

  it('should work with arrays of size 1', () => {
    expect(searchRotatedArray([1], 1)).toBe(0);
    expect(searchRotatedArray([1], 0)).toBe(-1);
  });

  it('should work with empty arrays', () => {
    expect(searchRotatedArray([], 5)).toBe(-1);
  });

  it('should work with different rotation points', () => {
    expect(searchRotatedArray([3, 4, 5, 1, 2], 1)).toBe(3);
    expect(searchRotatedArray([5, 1, 2, 3, 4], 5)).toBe(0);
    expect(searchRotatedArray([1, 2, 3, 4, 5], 5)).toBe(4); // No rotation
  });
});