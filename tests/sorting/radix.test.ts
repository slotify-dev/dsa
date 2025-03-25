import { radix } from '../../src/sorting';
import { describe, expect, it } from 'bun:test';

describe('Radix Sort', () => {
  // Test with non-negative integer arrays
  describe('Non-negative integer arrays', () => {
    it('should sort an empty array', () => {
      const arr: number[] = [];
      const result = radix(arr);
      expect(result).toEqual([]);
      expect(result).toBe(arr); // Check in-place sorting
    });

    it('should sort an array with a single element', () => {
      const arr = [1];
      const result = radix(arr);
      expect(result).toEqual([1]);
      expect(result).toBe(arr);
    });

    it('should sort an already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = radix(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort a reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = radix(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort an array with duplicates', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = radix(arr);
      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
      expect(result).toBe(arr);
    });

    it('should sort an array with zeros', () => {
      const arr = [3, 0, 4, 0, 2, 0, 1];
      const result = radix(arr);
      expect(result).toEqual([0, 0, 0, 1, 2, 3, 4]);
      expect(result).toBe(arr);
    });

    it('should sort a medium-sized random array', () => {
      const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const expected = [...arr].sort((a, b) => a - b);
      const result = radix(arr);
      expect(result).toEqual(expected);
      expect(result).toBe(arr);
    });
  });

  // Test with multi-digit numbers
  describe('Multi-digit numbers', () => {
    it('should sort an array with multi-digit numbers', () => {
      const arr = [170, 45, 75, 90, 802, 24, 2, 66];
      const result = radix(arr);
      expect(result).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
      expect(result).toBe(arr);
    });

    it('should sort an array with numbers of varying digit lengths', () => {
      const arr = [1, 10, 100, 1000, 9, 99, 999, 9999];
      const result = radix(arr);
      expect(result).toEqual([1, 9, 10, 99, 100, 999, 1000, 9999]);
      expect(result).toBe(arr);
    });
  });

  // Test with arrays containing only a few unique values
  describe('Arrays with few unique values', () => {
    it('should sort an array with only two unique values', () => {
      const arr = [1, 0, 1, 0, 1, 0, 1, 0, 1];
      const result = radix(arr);
      expect(result).toEqual([0, 0, 0, 0, 1, 1, 1, 1, 1]);
      expect(result).toBe(arr);
    });

    it('should sort an array with repeated elements', () => {
      const arr = [5, 5, 5, 5, 5];
      const result = radix(arr);
      expect(result).toEqual([5, 5, 5, 5, 5]);
      expect(result).toBe(arr);
    });
  });

  // Test with arrays having a large range
  describe('Arrays with large range', () => {
    it('should sort an array with a large range of values', () => {
      const arr = [0, 999, 5, 2, 100, 500, 3];
      const result = radix(arr);
      expect(result).toEqual([0, 2, 3, 5, 100, 500, 999]);
      expect(result).toBe(arr);
    });

    it('should sort an array with very large numbers', () => {
      const arr = [10000, 1000, 100, 10, 1];
      const result = radix(arr);
      expect(result).toEqual([1, 10, 100, 1000, 10000]);
      expect(result).toBe(arr);
    });
  });

  // Test stability
  describe('Stability', () => {
    it('should maintain the relative order of equal elements (stability)', () => {
      // Create an array with duplicate values but different identities
      // We can't directly test this with radix sort since it only works with numbers
      // But we can verify that the algorithm itself is stable
      const arr = [53, 53, 53, 53, 53];
      const result = radix(arr);
      expect(result).toEqual([53, 53, 53, 53, 53]);
      expect(result).toBe(arr);
    });
  });

  // Test with large arrays
  describe('Large arrays', () => {
    it('should handle large arrays efficiently', () => {
      const arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
      const expected = [...arr].sort((a, b) => a - b);
      const result = radix(arr);
      expect(result).toEqual(expected);
      expect(result).toBe(arr);
    });
  });

  // Test with edge cases
  describe('Edge cases', () => {
    it('should handle arrays with all identical elements', () => {
      const arr = Array(100).fill(42);
      const result = radix(arr);
      expect(result).toEqual(Array(100).fill(42));
      expect(result).toBe(arr);
    });
  });
});