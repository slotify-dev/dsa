import { insertion } from '../../src/sorting';
import { describe, expect, it } from 'bun:test';

// Helper function to create a deep copy of an array
function copyArray<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}

describe('Insertion Sort', () => {
  // Test with number arrays
  describe('Number arrays', () => {
    it('should sort an empty array', () => {
      const arr: number[] = [];
      const result = insertion(arr);
      expect(result).toEqual([]);
      expect(result).toBe(arr); // Check in-place sorting
    });

    it('should sort an array with a single element', () => {
      const arr = [1];
      const result = insertion(arr);
      expect(result).toEqual([1]);
      expect(result).toBe(arr);
    });

    it('should sort an already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = insertion(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort a reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = insertion(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).toBe(arr);
    });

    it('should sort an array with duplicates', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = insertion(arr);
      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
      expect(result).toBe(arr);
    });

    it('should sort an array with negative numbers', () => {
      const arr = [3, -1, 4, -5, 2, -8, 0];
      const result = insertion(arr);
      expect(result).toEqual([-8, -5, -1, 0, 2, 3, 4]);
      expect(result).toBe(arr);
    });

    it('should sort a medium-sized random array', () => {
      const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const expected = [...arr].sort((a, b) => a - b);
      const result = insertion(arr);
      expect(result).toEqual(expected);
      expect(result).toBe(arr);
    });
  });

  // Test with string arrays
  describe('String arrays', () => {
    it('should sort an array of strings', () => {
      const arr = ['banana', 'apple', 'pear', 'orange', 'kiwi'];
      const result = insertion(arr);
      expect(result).toEqual(['apple', 'banana', 'kiwi', 'orange', 'pear']);
      expect(result).toBe(arr);
    });

    it('should sort an array of strings with duplicates', () => {
      const arr = ['dog', 'cat', 'bird', 'cat', 'fish'];
      const result = insertion(arr);
      expect(result).toEqual(['bird', 'cat', 'cat', 'dog', 'fish']);
      expect(result).toBe(arr);
    });

    it('should sort an array of strings with different cases', () => {
      const arr = ['Zebra', 'apple', 'Banana', 'orange'];
      const result = insertion(arr);
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
      const result = insertion(arr, (a, b) => a.age - b.age);
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
      const result = insertion(arr, (a, b) => a.name.localeCompare(b.name));
      expect(result).toEqual([
        { name: 'Alice', age: 22 },
        { name: 'Bob', age: 30 },
        { name: 'Jane', age: 20 },
        { name: 'John', age: 25 }
      ]);
      expect(result).toBe(arr);
    });
  });

  // Test stability
  describe('Stability', () => {
    it('should maintain the relative order of equal elements (stability)', () => {
      const arr = [
        { value: 3, id: 1 },
        { value: 1, id: 2 },
        { value: 3, id: 3 },
        { value: 2, id: 4 },
        { value: 1, id: 5 }
      ];

      const result = insertion(arr, (a, b) => a.value - b.value);

      // Check that the order of elements with the same value is preserved
      expect(result[0].id).toBe(2); // First 1
      expect(result[1].id).toBe(5); // Second 1
      expect(result[3].id).toBe(1); // First 3
      expect(result[4].id).toBe(3); // Second 3
    });
  });

  // Test with nearly sorted arrays (where insertion sort excels)
  describe('Nearly sorted arrays', () => {
    it('should efficiently sort a nearly sorted array', () => {
      // Create a sorted array and swap a few elements
      const arr = Array.from({ length: 100 }, (_, i) => i);
      // Swap 5 random pairs
      for (let i = 0; i < 5; i++) {
        const idx1 = Math.floor(Math.random() * 100);
        const idx2 = Math.floor(Math.random() * 100);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }

      const expected = [...arr].sort((a, b) => a - b);
      const result = insertion(arr);
      expect(result).toEqual(expected);
      expect(result).toBe(arr);
    });
  });
});