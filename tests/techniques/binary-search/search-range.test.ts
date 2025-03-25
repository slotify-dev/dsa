import { describe, it, expect } from 'bun:test';
import { searchRange } from '../../../src/techniques/binary-search';

describe('searchRange', () => {
  it('should find the starting and ending positions of a target', () => {
    expect(searchRange([1, 3, 5, 5, 5, 7, 9], 5)).toEqual([2, 4]);
    expect(searchRange([1, 2, 3, 4, 5], 3)).toEqual([2, 2]);
    expect(searchRange([1, 1, 1, 1, 1], 1)).toEqual([0, 4]);
  });

  it('should return [-1, -1] if target is not found', () => {
    expect(searchRange([1, 3, 5, 7, 9], 6)).toEqual([-1, -1]);
    expect(searchRange([1, 3, 5, 7, 9], 0)).toEqual([-1, -1]);
    expect(searchRange([1, 3, 5, 7, 9], 10)).toEqual([-1, -1]);
  });

  it('should work with arrays of size 1', () => {
    expect(searchRange([5], 5)).toEqual([0, 0]);
    expect(searchRange([5], 6)).toEqual([-1, -1]);
  });

  it('should work with empty arrays', () => {
    expect(searchRange([], 5)).toEqual([-1, -1]);
  });

  it('should work with targets at the boundaries', () => {
    expect(searchRange([1, 1, 2, 3, 4, 5], 1)).toEqual([0, 1]);
    expect(searchRange([1, 2, 3, 4, 5, 5], 5)).toEqual([4, 5]);
  });
});