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
      const target1 = 'cherry';
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], target1)).toBe(4);

      const target2 = 'coconut';
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], target2)).toBe(4);

      const target3 = 'blueberry';
      expect(upperBound(['apple', 'banana', 'cherry', 'cherry', 'date'], target3)).toBe(2);
    });

    it('should return array length if all elements are less than or equal to target', () => {
      const target1 = 'date';
      expect(upperBound(['apple', 'banana', 'cherry', 'date'], target1)).toBe(4);

      const target2 = 'zebra';
      expect(upperBound(['apple', 'banana', 'cherry', 'date'], target2)).toBe(4);
    });

    it('should return 0 if all elements are greater than target', () => {
      const target = 'apple';
      expect(upperBound(['banana', 'cherry', 'date'], target)).toBe(0);
    });
  });

  describe('with object arrays and custom comparator', () => {
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
      const targetPerson: Person = { name: '', age: 25 };
      expect(upperBound(
        people,
        targetPerson,
        (person, target) => person.age - target.age
      )).toBe(3);

      const targetPerson2: Person = { name: '', age: 20 };
      expect(upperBound(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
      )).toBe(1);
    });

    it('should return array length if all people are younger than or equal to target', () => {
      const targetPerson: Person = { name: '', age: 35 };
      expect(upperBound(
        people,
        targetPerson,
        (person, target) => person.age - target.age
      )).toBe(5);

      const targetPerson2: Person = { name: '', age: 40 };
      expect(upperBound(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
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
      const targetProduct: Product = { id: '', price: 20, stock: 0 };
      expect(upperBound(
        products,
        targetProduct,
        (product, target) => product.price - target.price
      )).toBe(3);

      const targetProduct2: Product = { id: '', price: 25, stock: 0 };
      expect(upperBound(
        products,
        targetProduct2,
        (product, target) => product.price - target.price
      )).toBe(3);
    });

    it('should find products by stock', () => {
      const targetProduct: Product = { id: '', price: 0, stock: 15 };
      expect(upperBound(
        products,
        targetProduct,
        (product, target) => product.stock - target.stock
      )).toBe(3);
    });
  });
});