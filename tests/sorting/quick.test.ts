import { quick } from '../../src/sorting';
import { describe, expect, it } from 'bun:test';

// Helper function to create a deep copy of an array
function copyArray<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}

describe('Quick Sort', () => {
  // Test with number arrays
  describe('Number arrays', () => {
    it('should sort an empty array', () => {
      const arr: number[] = [];
      const result = quick(arr);
      expect(result).toEqual([]);
      expect(result).toBe(arr); // Check in-place sorting
    });

    it('should sort an array with a single element', () => {
      const arr = [1];
      const result = quick(arr);
      expect(result).toEqual([1]);
      expect(result).toBe(arr);
    });

    it('should sort an already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = quick(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort a reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = quick(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort an array with duplicates', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = quick(arr);
      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
      expect(result).toBe(arr);
    });

    it('should sort an array with negative numbers', () => {
      const arr = [3, -1, 4, -5, 2, -8, 0];
      const result = quick(arr);
      expect(result).toEqual([-8, -5, -1, 0, 2, 3, 4]);
      expect(result).toBe(arr);
    });

    it('should sort a large random array', () => {
      const arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
      const expected = [...arr].sort((a, b) => a - b);
      const result = quick(arr);
      expect(result).toEqual(expected);
      expect(result).toBe(arr);
    });
  });

  // Test with string arrays
  describe('String arrays', () => {
    it('should sort an array of strings', () => {
      const arr = ['banana', 'apple', 'pear', 'orange', 'kiwi'];
      const result = quick(arr);
      expect(result).toEqual(['apple', 'banana', 'kiwi', 'orange', 'pear']);
      expect(result).toBe(arr);
    });

    it('should sort an array of strings with duplicates', () => {
      const arr = ['dog', 'cat', 'bird', 'cat', 'fish'];
      const result = quick(arr);
      expect(result).toEqual(['bird', 'cat', 'cat', 'dog', 'fish']);
      expect(result).toBe(arr);
    });

    it('should sort an array of strings with different cases', () => {
      const arr = ['Zebra', 'apple', 'Banana', 'orange'];
      const result = quick(arr);
      expect(result).toEqual(['Banana', 'Zebra', 'apple', 'orange']);
      expect(result).toBe(arr);
    });
  });

  // Test with object arrays and custom comparator
  describe('Object arrays with custom comparator', () => {
    interface Person {
      name: string;
      age: number;
    }

    const people: Person[] = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 20 },
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 22 }
    ];

    it('should sort objects by age', () => {
      const arr = copyArray(people);
      const result = quick(arr, (a, b) => a.age - b.age);
      expect(result).toEqual([
        { name: 'Jane', age: 20 },
        { name: 'Alice', age: 22 },
        { name: 'John', age: 25 },
        { name: 'Bob', age: 30 }
      ]);
      expect(result).toBe(arr);
    });

    it('should sort objects by name', () => {
      const arr = copyArray(people);
      const result = quick(arr, (a, b) => a.name.localeCompare(b.name));
      expect(result).toEqual([
        { name: 'Alice', age: 22 },
        { name: 'Bob', age: 30 },
        { name: 'Jane', age: 20 },
        { name: 'John', age: 25 }
      ]);
      expect(result).toBe(arr);
    });
  });

  // Test with worst-case scenarios
  describe('Worst-case scenarios', () => {
    it('should handle already sorted arrays efficiently', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      const result = quick(arr);
      expect(result).toEqual(arr);
      expect(result).toBe(arr);
    });

    it('should handle arrays with all identical elements', () => {
      const arr = Array.from({ length: 100 }, () => 42);
      const result = quick(arr);
      expect(result).toEqual(arr);
      expect(result).toBe(arr);
    });
  });

  // Test with edge cases
  describe('Edge cases', () => {
    it('should handle arrays with very large values', () => {
      const arr = [Number.MAX_SAFE_INTEGER, 5, Number.MIN_SAFE_INTEGER, 0];
      const result = quick(arr);
      expect(result).toEqual([Number.MIN_SAFE_INTEGER, 0, 5, Number.MAX_SAFE_INTEGER]);
      expect(result).toBe(arr);
    });
  });
});