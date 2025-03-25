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

  it('should handle left half sorted, target in left half', () => {
    // Left half is sorted, target is in left half
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 5)).toBe(1);
    expect(searchRotatedArray([6, 7, 8, 1, 2, 3, 4, 5], 7)).toBe(1);
  });

  it('should handle left half sorted, target not in left half', () => {
    // Left half is sorted, target is not in left half
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    expect(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 1)).toBe(5);
  });

  it('should handle right half sorted, target in right half', () => {
    // Right half is sorted, target is in right half
    expect(searchRotatedArray([6, 7, 0, 1, 2, 3, 4], 3)).toBe(5);
    expect(searchRotatedArray([5, 6, 7, 8, 9, 0, 1, 2], 1)).toBe(6);
  });

  it('should handle right half sorted, target not in right half', () => {
    // Right half is sorted, target is not in right half
    expect(searchRotatedArray([6, 7, 0, 1, 2, 3, 4], 6)).toBe(0);
    expect(searchRotatedArray([5, 6, 7, 8, 9, 0, 1, 2], 7)).toBe(2);
  });

  it('should handle edge cases with left == mid', () => {
    // When left equals mid
    expect(searchRotatedArray([3, 1], 1)).toBe(1);
    expect(searchRotatedArray([1, 3], 1)).toBe(0);
  });

  it('should handle various rotation patterns', () => {
    // Different rotation patterns
    expect(searchRotatedArray([3, 1, 2], 1)).toBe(1);
    expect(searchRotatedArray([1, 3, 5], 5)).toBe(2);
    expect(searchRotatedArray([5, 1, 3], 5)).toBe(0);
  });
});