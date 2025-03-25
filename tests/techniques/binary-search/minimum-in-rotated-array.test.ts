import { describe, it, expect } from 'bun:test';
import { minimumInRotatedArray } from '../../../src/binary-search';

describe('minimumInRotatedArray', () => {
  describe('with number arrays', () => {
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
      // Test the case where mid equals right and we decrement right
      expect(minimumInRotatedArray([3, 1, 3, 3, 3, 3])).toBe(1);
      expect(minimumInRotatedArray([3, 3, 3, 3, 3, 3])).toBe(3);
    });

    it('should handle empty arrays', () => {
      expect(minimumInRotatedArray([])).toBe(-1);
    });
  });

  describe('with string arrays', () => {
    it('should find the minimum element in a rotated sorted array', () => {
      expect(minimumInRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'])).toBe('a');
      expect(minimumInRotatedArray(['c', 'd', 'a', 'b'])).toBe('a');
      expect(minimumInRotatedArray(['apple', 'banana', 'cherry'])).toBe('apple');
    });

    it('should work with non-rotated arrays', () => {
      expect(minimumInRotatedArray(['a', 'b', 'c', 'd', 'e'])).toBe('a');
    });

    it('should work with arrays containing duplicate elements', () => {
      expect(minimumInRotatedArray(['c', 'c', 'a', 'c'])).toBe('a');
      expect(minimumInRotatedArray(['b', 'b', 'b', 'a', 'b'])).toBe('a');
    });
  });

  describe('with object arrays', () => {
    interface Person {
      name: string;
      age: number;
    }

    // Rotated array of people sorted by age
    const rotatedPeople: Person[] = [
      { name: 'David', age: 30 },
      { name: 'Eve', age: 35 },
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 25 }
    ];

    it('should find the person with minimum age in a rotated array', () => {
      expect(minimumInRotatedArray(
        rotatedPeople,
        (a, b) => a.age - b.age
      )).toEqual({ name: 'Alice', age: 20 });
    });

    // Non-rotated array of people sorted by age
    const nonRotatedPeople: Person[] = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 35 }
    ];

    it('should find the person with minimum age in a non-rotated array', () => {
      expect(minimumInRotatedArray(
        nonRotatedPeople,
        (a, b) => a.age - b.age
      )).toEqual({ name: 'Alice', age: 20 });
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Product {
      id: string;
      price: number;
      name: string;
    }

    // Rotated array of products sorted by price
    const rotatedProducts: Product[] = [
      { id: 'p3', price: 30, name: 'Product C' },
      { id: 'p4', price: 40, name: 'Product D' },
      { id: 'p1', price: 10, name: 'Product A' },
      { id: 'p2', price: 20, name: 'Product B' }
    ];

    it('should find the product with minimum price in a rotated array', () => {
      expect(minimumInRotatedArray(
        rotatedProducts,
        (a, b) => a.price - b.price
      )).toEqual({ id: 'p1', price: 10, name: 'Product A' });
    });

    // Rotated array of products sorted by name
    const nameRotatedProducts: Product[] = [
      { id: 'p3', price: 30, name: 'Product C' },
      { id: 'p4', price: 40, name: 'Product D' },
      { id: 'p1', price: 10, name: 'Product A' },
      { id: 'p2', price: 20, name: 'Product B' }
    ];

    it('should find the product with alphabetically first name in a rotated array', () => {
      expect(minimumInRotatedArray(
        nameRotatedProducts,
        (a, b) => a.name.localeCompare(b.name)
      )).toEqual({ id: 'p1', price: 10, name: 'Product A' });
    });
  });
});