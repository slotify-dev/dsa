import { describe, it, expect } from 'bun:test';
import { searchInsertPosition } from '../../../src/techniques/binary-search';

describe('searchInsertPosition', () => {
  describe('with number arrays', () => {
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

  describe('with string arrays', () => {
    it('should return the index if target is found', () => {
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'cherry')).toBe(2);
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'apple')).toBe(0);
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'date')).toBe(3);
    });

    it('should return the insertion position if target is not found', () => {
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'blueberry')).toBe(1);
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'elderberry')).toBe(4);
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], 'aardvark')).toBe(0);
    });
  });

  describe('with object arrays', () => {
    interface Person {
      name: string;
      age: number;
    }

    const people: Person[] = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 35 }
    ];

    it('should return the index if target age is found', () => {
      expect(searchInsertPosition(
        people,
        25,
        (person, age) => person.age - age
      )).toBe(1);

      expect(searchInsertPosition(
        people,
        20,
        (person, age) => person.age - age
      )).toBe(0);
    });

    it('should return the insertion position if target age is not found', () => {
      expect(searchInsertPosition(
        people,
        22,
        (person, age) => person.age - age
      )).toBe(1);

      expect(searchInsertPosition(
        people,
        40,
        (person, age) => person.age - age
      )).toBe(4);
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Product {
      name: string;
      price: number;
      category: string;
    }

    const products: Product[] = [
      { name: 'Product A', price: 10, category: 'Electronics' },
      { name: 'Product B', price: 20, category: 'Books' },
      { name: 'Product C', price: 30, category: 'Clothing' },
      { name: 'Product D', price: 40, category: 'Home' }
    ];

    it('should find the correct insertion position by price', () => {
      expect(searchInsertPosition(
        products,
        25,
        (product, price) => product.price - price
      )).toBe(2);
    });

    it('should find the correct insertion position by category', () => {
      expect(searchInsertPosition(
        products,
        'Clothing',
        (product, category) => product.category.localeCompare(category)
      )).toBe(2);

      expect(searchInsertPosition(
        products,
        'Food',
        (product, category) => product.category.localeCompare(category)
      )).toBe(3);
    });
  });
});