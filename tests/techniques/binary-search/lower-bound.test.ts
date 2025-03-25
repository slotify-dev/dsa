import { describe, it, expect } from 'bun:test';
import { lowerBound } from '../../../src/techniques/binary-search';

describe('lowerBound', () => {
  describe('with number arrays', () => {
    it('should find the first element greater than or equal to the target', () => {
      expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 5)).toBe(2);
      expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 6)).toBe(5);
      expect(lowerBound([1, 3, 5, 5, 5, 7, 9], 4)).toBe(2);
    });

    it('should return array length if all elements are smaller than target', () => {
      expect(lowerBound([1, 3, 5, 7, 9], 10)).toBe(5);
    });

    it('should return 0 if all elements are greater than or equal to target', () => {
      expect(lowerBound([1, 3, 5, 7, 9], 0)).toBe(0);
      expect(lowerBound([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    it('should work with arrays of size 1', () => {
      expect(lowerBound([5], 5)).toBe(0);
      expect(lowerBound([5], 4)).toBe(0);
      expect(lowerBound([5], 6)).toBe(1);
    });

    it('should work with empty arrays', () => {
      expect(lowerBound([], 5)).toBe(0);
    });

    it('should work with duplicate elements', () => {
      expect(lowerBound([1, 1, 1, 1, 1], 1)).toBe(0);
      expect(lowerBound([1, 1, 1, 1, 1], 0)).toBe(0);
      expect(lowerBound([1, 1, 1, 1, 1], 2)).toBe(5);
    });
  });

  describe('with string arrays', () => {
    it('should find the first element greater than or equal to the target', () => {
      expect(lowerBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'cherry')).toBe(2);
      expect(lowerBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'coconut')).toBe(4);
      expect(lowerBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'blueberry')).toBe(1);
    });

    it('should return array length if all elements are smaller than target', () => {
      expect(lowerBound(['apple', 'banana', 'cherry', 'date'], 'zebra')).toBe(4);
    });

    it('should return 0 if all elements are greater than or equal to target', () => {
      expect(lowerBound(['banana', 'cherry', 'date'], 'apple')).toBe(0);
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
      { name: 'Charlie', age: 25 },
      { name: 'David', age: 30 },
      { name: 'Eve', age: 35 }
    ];

    it('should find the first person with age greater than or equal to target', () => {
      expect(lowerBound(
        people,
        25,
        (person, age) => person.age - age
      )).toBe(1);

      expect(lowerBound(
        people,
        27,
        (person, age) => person.age - age
      )).toBe(3);
    });

    it('should return array length if all people are younger than target', () => {
      expect(lowerBound(
        people,
        40,
        (person, age) => person.age - age
      )).toBe(5);
    });

    it('should return 0 if all people are older than or equal to target', () => {
      expect(lowerBound(
        people,
        20,
        (person, age) => person.age - age
      )).toBe(0);
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Product {
      id: string;
      price: number;
      stock: number;
    }

    const products: Product[] = [
      { id: 'p1', price: 10, stock: 5 },
      { id: 'p2', price: 20, stock: 10 },
      { id: 'p3', price: 20, stock: 15 },
      { id: 'p4', price: 30, stock: 20 },
      { id: 'p5', price: 40, stock: 25 }
    ];

    it('should find products by price', () => {
      expect(lowerBound(
        products,
        20,
        (product, price) => product.price - price
      )).toBe(1);

      expect(lowerBound(
        products,
        25,
        (product, price) => product.price - price
      )).toBe(3);
    });

    it('should find products by stock', () => {
      expect(lowerBound(
        products,
        15,
        (product, stock) => product.stock - stock
      )).toBe(2);
    });
  });
});