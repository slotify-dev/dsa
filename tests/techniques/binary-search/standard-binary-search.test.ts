import { describe, it, expect } from 'bun:test';
import { standardBinarySearch } from '../../../src/techniques/binary-search';

describe('standardBinarySearch', () => {
  it('should find elements in a sorted array', () => {
    expect(standardBinarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(standardBinarySearch([1, 2, 3, 4, 5], 1)).toBe(0);
    expect(standardBinarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
  });

  it('should return -1 for elements not in the array', () => {
    expect(standardBinarySearch([1, 2, 3, 4, 5], 0)).toBe(-1);
    expect(standardBinarySearch([1, 2, 3, 4, 5], 6)).toBe(-1);
    expect(standardBinarySearch([1, 2, 3, 4, 5], 2.5)).toBe(-1);
  });

  it('should work with arrays of size 1', () => {
    expect(standardBinarySearch([1], 1)).toBe(0);
    expect(standardBinarySearch([1], 2)).toBe(-1);
  });

  it('should work with empty arrays', () => {
    expect(standardBinarySearch([], 1)).toBe(-1);
  });

  it('should work with large arrays', () => {
    const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
    expect(standardBinarySearch(largeArray, 500)).toBe(250);
    expect(standardBinarySearch(largeArray, 998)).toBe(499);
    expect(standardBinarySearch(largeArray, 999)).toBe(-1);
  });
});