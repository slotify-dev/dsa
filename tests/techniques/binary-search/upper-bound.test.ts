import { describe, it, expect } from 'bun:test';
import { upperBound } from '../../../src/techniques/binary-search';

describe('upperBound', () => {
  describe('with number arrays', () => {
    it('should find the first element strictly greater than the target', () => {
      expect(upperBound([1, 3, 5, 5, 5, 7, 9], 5)).toBe(5);
      expect(upperBound([1, 3, 5, 5, 5, 7, 9], 6)).toBe(5);
      expect(upperBound([1, 3, 5, 5, 5, 7, 9], 4)).toBe(2);
    });

    it('should return array length if all elements are less than or equal to target', () => {
      expect(upperBound([1, 3, 5, 7, 9], 9)).toBe(5);
      expect(upperBound([1, 3, 5, 7, 9], 10)).toBe(5);
    });

    it('should return 0 if all elements are greater than target', () => {
      expect(upperBound([1, 3, 5, 7, 9], 0)).toBe(0);
    });

    it('should work with arrays of size 1', () => {
      expect(upperBound([5], 5)).toBe(1);
      expect(upperBound([5], 4)).toBe(0);
      expect(upperBound([5], 6)).toBe(1);
    });

    it('should work with empty arrays', () => {
      expect(upperBound([], 5)).toBe(0);
    });

    it('should work with duplicate elements', () => {
      expect(upperBound([1, 1, 1, 1, 1], 1)).toBe(5);
      expect(upperBound([1, 1, 1, 1, 1], 0)).toBe(0);
      expect(upperBound([1, 1, 1, 1, 1], 2)).toBe(5);
    });
  });

  describe('with string arrays', () => {
    it('should find the first element strictly greater than the target', () => {
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'cherry')).toBe(4);
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'coconut')).toBe(4);
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], 'blueberry')).toBe(1);
    });

    it('should return array length if all elements are less than or equal to target', () => {
      expect(upperBound(['apple', 'banana', 'cherry', 'date'], 'date')).toBe(4);
      expect(upperBound(['apple', 'banana', 'cherry', 'date'], 'zebra')).toBe(4);
    });

    it('should return 0 if all elements are greater than target', () => {
      expect(upperBound(['banana', 'cherry', 'date'], 'apple')).toBe(0);
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

    it('should find the first person with age strictly greater than target', () => {
      expect(upperBound(
        people,
        25,
        (person, age) => person.age - age
      )).toBe(3);

      expect(upperBound(
        people,
        20,
        (person, age) => person.age - age
      )).toBe(1);
    });

    it('should return array length if all people are younger than or equal to target', () => {
      expect(upperBound(
        people,
        35,
        (person, age) => person.age - age
      )).toBe(5);

      expect(upperBound(
        people,
        40,
        (person, age) => person.age - age
      )).toBe(5);
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
      expect(upperBound(
        products,
        20,
        (product, price) => product.price - price
      )).toBe(3);

      expect(upperBound(
        products,
        25,
        (product, price) => product.price - price
      )).toBe(3);
    });

    it('should find products by stock', () => {
      expect(upperBound(
        products,
        15,
        (product, stock) => product.stock - stock
      )).toBe(3);
    });
  });
});