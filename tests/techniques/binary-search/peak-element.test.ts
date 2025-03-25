import { describe, it, expect } from 'bun:test';
import { peakElement } from '../../../src/binary-search';

describe('peakElement', () => {
  describe('with number arrays', () => {
    it('should find a peak element in the array', () => {
      const result = peakElement([1, 2, 3, 1]);
      expect(result).toBe(2);

      const result2 = peakElement([1, 2, 1, 3, 5, 6, 4]);
      // Could be either 1 or 5
      expect([1, 5]).toContain(result2);
    });

    it('should work with arrays of size 1', () => {
      expect(peakElement([1])).toBe(0);
    });

    it('should work with arrays of size 2', () => {
      expect(peakElement([1, 2])).toBe(1);
      expect(peakElement([2, 1])).toBe(0);
    });

    it('should work with monotonically increasing arrays', () => {
      expect(peakElement([1, 2, 3, 4, 5])).toBe(4);
    });

    it('should work with monotonically decreasing arrays', () => {
      expect(peakElement([5, 4, 3, 2, 1])).toBe(0);
    });

    it('should work with arrays having multiple peaks', () => {
      // Could return any peak
      const result = peakElement([1, 3, 2, 4, 1, 5, 2]);
      expect([1, 3, 5]).toContain(result);
    });

    it('should verify the returned index is actually a peak', () => {
      const arrays = [
        [1, 2, 3, 1],
        [1, 2, 1, 3, 5, 6, 4],
        [5, 4, 3, 2, 1],
        [1, 3, 2, 4, 1, 5, 2]
      ];

      for (const arr of arrays) {
        const peakIdx = peakElement(arr);

        // Check if it's a peak (greater than neighbors)
        if (peakIdx > 0) {
          expect(arr[peakIdx]).toBeGreaterThan(arr[peakIdx - 1]);
        }

        if (peakIdx < arr.length - 1) {
          expect(arr[peakIdx]).toBeGreaterThan(arr[peakIdx + 1]);
        }
      }
    });
  });

  describe('with string arrays', () => {
    it('should find a peak element in the array', () => {
      const result = peakElement(['apple', 'cherry', 'banana', 'apricot']);
      expect(result).toBe(1); // 'cherry' is lexicographically greater than neighbors

      const result2 = peakElement(['dog', 'elephant', 'cat', 'fox', 'zebra', 'wolf']);
      // Could be either 1 ('elephant') or 4 ('zebra')
      expect([1, 4]).toContain(result2);
    });

    it('should work with monotonically increasing arrays', () => {
      expect(peakElement(['apple', 'banana', 'cherry', 'date', 'elderberry'])).toBe(4);
    });

    it('should work with monotonically decreasing arrays', () => {
      expect(peakElement(['zebra', 'yak', 'wolf', 'tiger', 'snake'])).toBe(0);
    });

    it('should verify the returned index is actually a peak', () => {
      const arrays = [
        ['apple', 'cherry', 'banana', 'apricot'],
        ['dog', 'elephant', 'cat', 'fox', 'zebra', 'wolf']
      ];

      for (const arr of arrays) {
        const peakIdx = peakElement(arr);

        // Check if it's a peak (lexicographically greater than neighbors)
        if (peakIdx > 0) {
          expect(arr[peakIdx].localeCompare(arr[peakIdx - 1])).toBeGreaterThan(0);
        }

        if (peakIdx < arr.length - 1) {
          expect(arr[peakIdx].localeCompare(arr[peakIdx + 1])).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('with object arrays', () => {
    interface Person {
      name: string;
      age: number;
    }

    const people: Person[] = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 25 },
      { name: 'David', age: 15 }
    ];

    it('should find a peak element by age', () => {
      const peakIdx = peakElement(
        people,
        (a, b) => a.age - b.age
      );

      expect(peakIdx).toBe(1); // Bob with age 30 is the peak

      // Verify it's a peak
      if (peakIdx > 0) {
        expect(people[peakIdx].age).toBeGreaterThan(people[peakIdx - 1].age);
      }

      if (peakIdx < people.length - 1) {
        expect(people[peakIdx].age).toBeGreaterThan(people[peakIdx + 1].age);
      }
    });

    const peopleSortedByName: Person[] = [
      { name: 'Alice', age: 20 },
      { name: 'David', age: 15 },
      { name: 'Charlie', age: 25 },
      { name: 'Bob', age: 30 }
    ];

    it('should find a peak element by name', () => {
      const peakIdx = peakElement(
        peopleSortedByName,
        (a, b) => a.name.localeCompare(b.name)
      );

      expect(peakIdx).toBe(1); // 'David' is lexicographically greater than neighbors
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Product {
      id: string;
      price: number;
      rating: number;
    }

    const products: Product[] = [
      { id: 'p1', price: 10, rating: 3.5 },
      { id: 'p2', price: 20, rating: 4.5 },
      { id: 'p3', price: 15, rating: 4.0 },
      { id: 'p4', price: 5, rating: 3.0 }
    ];

    it('should find a peak element by price', () => {
      const peakIdx = peakElement(
        products,
        (a, b) => a.price - b.price
      );

      expect(peakIdx).toBe(1); // Product with price 20 is the peak
    });

    it('should find a peak element by rating', () => {
      const peakIdx = peakElement(
        products,
        (a, b) => a.rating - b.rating
      );

      expect(peakIdx).toBe(1); // Product with rating 4.5 is the peak
    });

    // Test with a custom value function
    it('should find a peak element by price-to-rating ratio', () => {
      const peakIdx = peakElement(
        products,
        (a, b) => (a.price / a.rating) - (b.price / b.rating)
      );

      // Verify it's a peak
      if (peakIdx > 0) {
        expect(products[peakIdx].price / products[peakIdx].rating)
          .toBeGreaterThan(products[peakIdx - 1].price / products[peakIdx - 1].rating);
      }

      if (peakIdx < products.length - 1) {
        expect(products[peakIdx].price / products[peakIdx].rating)
          .toBeGreaterThan(products[peakIdx + 1].price / products[peakIdx + 1].rating);
      }
    });
  });
});