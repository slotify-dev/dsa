import { describe, it, expect } from 'bun:test';
import { searchRotatedArray } from '../../src/binary-search';

describe('searchRotatedArray', () => {
  describe('with number arrays', () => {
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

  describe('with string arrays', () => {
    it('should find the target in a rotated sorted array', () => {
      expect(searchRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'], 'a')).toBe(3);
      expect(searchRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'], 'd')).toBe(0);
      expect(searchRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'], 'c')).toBe(5);
    });

    it('should return -1 if target is not found', () => {
      expect(searchRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'], 'g')).toBe(-1);
      expect(searchRotatedArray(['d', 'e', 'f', 'a', 'b', 'c'], 'z')).toBe(-1);
    });

    it('should work with non-rotated arrays', () => {
      expect(searchRotatedArray(['a', 'b', 'c', 'd', 'e'], 'c')).toBe(2);
      expect(searchRotatedArray(['a', 'b', 'c', 'd', 'e'], 'f')).toBe(-1);
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
      { name: 'Frank', age: 40 },
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 25 }
    ];

    it('should find a person by age in a rotated array', () => {
      const targetPerson1: Person = { name: '', age: 20 };
      expect(searchRotatedArray(
        rotatedPeople,
        targetPerson1,
        (person, target) => person.age - target.age
      )).toBe(3);

      const targetPerson2: Person = { name: '', age: 35 };
      expect(searchRotatedArray(
        rotatedPeople,
        targetPerson2,
        (person, target) => person.age - target.age
      )).toBe(1);
    });

    it('should return -1 if no person with the target age is found', () => {
      const targetPerson: Person = { name: '', age: 22 };
      expect(searchRotatedArray(
        rotatedPeople,
        targetPerson,
        (person, target) => person.age - target.age
      )).toBe(-1);
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Product {
      id: string;
      price: number;
      category: string;
    }

    // Rotated array of products sorted by price
    const rotatedProducts: Product[] = [
      { id: 'p3', price: 30, category: 'Electronics' },
      { id: 'p4', price: 40, category: 'Books' },
      { id: 'p5', price: 50, category: 'Clothing' },
      { id: 'p1', price: 10, category: 'Home' },
      { id: 'p2', price: 20, category: 'Beauty' }
    ];

    it('should find a product by price in a rotated array', () => {
      const targetProduct1: Product = { id: '', price: 10, category: '' };
      expect(searchRotatedArray(
        rotatedProducts,
        targetProduct1,
        (product, target) => product.price - target.price
      )).toBe(3);

      const targetProduct2: Product = { id: '', price: 40, category: '' };
      expect(searchRotatedArray(
        rotatedProducts,
        targetProduct2,
        (product, target) => product.price - target.price
      )).toBe(1);
    });

    it('should return -1 if no product with the target price is found', () => {
      const targetProduct: Product = { id: '', price: 25, category: '' };
      expect(searchRotatedArray(
        rotatedProducts,
        targetProduct,
        (product, target) => product.price - target.price
      )).toBe(-1);
    });

    // Rotated array of products sorted by category
    const categoryRotatedProducts: Product[] = [
      { id: 'p3', price: 30, category: 'Electronics' },
      { id: 'p4', price: 40, category: 'Home' },
      { id: 'p1', price: 10, category: 'Beauty' },
      { id: 'p2', price: 20, category: 'Books' },
      { id: 'p5', price: 50, category: 'Clothing' }
    ];

    it('should find a product by category in a rotated array', () => {
      const targetProduct1: Product = { id: '', price: 0, category: 'Beauty' };
      expect(searchRotatedArray(
        categoryRotatedProducts,
        targetProduct1,
        (product, target) => product.category.localeCompare(target.category)
      )).toBe(2);

      const targetProduct2: Product = { id: '', price: 0, category: 'Home' };
      expect(searchRotatedArray(
        categoryRotatedProducts,
        targetProduct2,
        (product, target) => product.category.localeCompare(target.category)
      )).toBe(1);
    });
  });
});