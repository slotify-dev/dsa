import { describe, it, expect } from 'bun:test';
import { searchInsertPosition } from '../../../src/techniques/binary-search';

describe('searchInsertPosition', () => {
  it('should return the index if target is found', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 5)).toBe(2);
    expect(searchInsertPosition([1, 3, 5, 6], 1)).toBe(0);
    expect(searchInsertPosition([1, 3, 5, 6], 6)).toBe(3);
  });

  it('should return the insertion position if target is not found', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 2)).toBe(1);
    expect(searchInsertPosition([1, 3, 5, 6], 7)).toBe(4);
    expect(searchInsertPosition([1, 3, 5, 6], 0)).toBe(0);
  });

  it('should work with arrays of size 1', () => {
    expect(searchInsertPosition([1], 1)).toBe(0);
    expect(searchInsertPosition([1], 0)).toBe(0);
    expect(searchInsertPosition([1], 2)).toBe(1);
  });

  it('should work with empty arrays', () => {
    expect(searchInsertPosition([], 5)).toBe(0);
  });

  it('should work with duplicate elements', () => {
    expect(searchInsertPosition([1, 3, 5, 5, 5, 6], 5)).toBe(2); // Returns first occurrence
    expect(searchInsertPosition([1, 3, 5, 5, 5, 6], 4)).toBe(2);
  });
});