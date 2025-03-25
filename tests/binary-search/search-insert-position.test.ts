import { describe, it, expect } from 'bun:test';
import { searchInsertPosition } from '../../src/binary-search';

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
      const target1 = 'cherry';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target1)).toBe(2);

      const target2 = 'apple';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target2)).toBe(0);

      const target3 = 'date';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target3)).toBe(3);
    });

    it('should return the insertion position if target is not found', () => {
      const target1 = 'blueberry';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target1)).toBe(2);

      const target2 = 'elderberry';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target2)).toBe(4);

      const target3 = 'aardvark';
      expect(searchInsertPosition(['apple', 'banana', 'cherry', 'date'], target3)).toBe(0);
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
      const targetPerson1: Person = { name: '', age: 25 };
      expect(searchInsertPosition(
        people,
        targetPerson1,
        (person, target) => person.age - target.age
      )).toBe(1);

      const targetPerson2: Person = { name: '', age: 20 };
      expect(searchInsertPosition(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
      )).toBe(0);
    });

    it('should return the insertion position if target age is not found', () => {
      const targetPerson1: Person = { name: '', age: 22 };
      expect(searchInsertPosition(
        people,
        targetPerson1,
        (person, target) => person.age - target.age
      )).toBe(1);

      const targetPerson2: Person = { name: '', age: 40 };
      expect(searchInsertPosition(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
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
      const targetProduct: Product = { name: '', price: 25, category: '' };
      expect(searchInsertPosition(
        products,
        targetProduct,
        (product, target) => product.price - target.price
      )).toBe(2);
    });

    it('should find the correct insertion position by category', () => {
      const targetProduct1: Product = { name: '', price: 0, category: 'Clothing' };
      expect(searchInsertPosition(
        products,
        targetProduct1,
        (product, target) => product.category.localeCompare(target.category)
      )).toBe(2);

      const targetProduct2: Product = { name: '', price: 0, category: 'Food' };
      expect(searchInsertPosition(
        products,
        targetProduct2,
        (product, target) => product.category.localeCompare(target.category)
      )).toBe(3);
    });
  });
});