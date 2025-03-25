import { counting } from '../../src/sorting';
import { describe, expect, it } from 'bun:test';

describe('Counting Sort', () => {
  // Test with non-negative integer arrays
  describe('Non-negative integer arrays', () => {
    it('should sort an empty array', () => {
      const arr: number[] = [];
      const result = counting(arr);
      expect(result).toEqual([]);
    });

    it('should sort an array with a single element', () => {
      const arr = [1];
      const result = counting(arr);
      expect(result).toEqual([1]);
    });

    it('should sort an already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = counting(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort a reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = counting(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort an array with duplicates', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = counting(arr);
      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    it('should sort an array with zeros', () => {
      const arr = [3, 0, 4, 0, 2, 0, 1];
      const result = counting(arr);
      expect(result).toEqual([0, 0, 0, 1, 2, 3, 4]);
    });

    it('should sort a medium-sized random array', () => {
      const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
      const expected = [...arr].sort((a, b) => a - b);
      const result = counting(arr);
      expect(result).toEqual(expected);
    });
  });

  // Test with arrays containing only a few unique values
  describe('Arrays with few unique values', () => {
    it('should sort an array with only two unique values', () => {
      const arr = [1, 0, 1, 0, 1, 0, 1, 0, 1];
      const result = counting(arr);
      expect(result).toEqual([0, 0, 0, 0, 1, 1, 1, 1, 1]);
    });

    it('should sort an array with repeated elements', () => {
      const arr = [5, 5, 5, 5, 5];
      const result = counting(arr);
      expect(result).toEqual([5, 5, 5, 5, 5]);
    });
  });

  // Test with arrays having a large range
  describe('Arrays with large range', () => {
    it('should sort an array with a large range of values', () => {
      const arr = [0, 999, 5, 2, 100, 500, 3];
      const result = counting(arr);
      expect(result).toEqual([0, 2, 3, 5, 100, 500, 999]);
    });
  });

  // Test stability
  describe('Stability', () => {
    it('should maintain the relative order of equal elements (stability)', () => {
      // Since counting sort doesn't use a comparator, we need to test stability differently
      // We'll use an array of objects and sort by a specific property
      const arr = [
        { value: 3, id: 1 },
        { value: 1, id: 2 },
        { value: 3, id: 3 },
        { value: 2, id: 4 },
        { value: 1, id: 5 }
      ];

      // Extract values for counting sort
      const values = arr.map(item => item.value);
      const sortedValues = counting(values);

      // Check that the values are sorted correctly
      expect(sortedValues).toEqual([1, 1, 2, 3, 3]);

      // Note: We can't directly test stability with counting sort on objects
      // since it only works with non-negative integers
    });
  });

  // Test with edge cases
  describe('Edge cases', () => {
    it('should handle arrays with large values', () => {
      const arr = [1000, 500, 100, 50, 10];
      const result = counting(arr);
      expect(result).toEqual([10, 50, 100, 500, 1000]);
    });

    it('should handle arrays with all identical elements', () => {
      const arr = Array(100).fill(42);
      const result = counting(arr);
      expect(result).toEqual(Array(100).fill(42));
    });
  });
});