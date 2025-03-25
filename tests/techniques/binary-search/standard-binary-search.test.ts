import { describe, it, expect } from 'bun:test';
import { standardBinarySearch } from '../../../src/binary-search';

describe('standardBinarySearch', () => {
  describe('with number arrays', () => {
    it('should find elements in a sorted array', () => {
      expect(standardBinarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
      expect(standardBinarySearch([1, 2, 3, 4, 5], 1)).toBe(0);
      expect(standardBinarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    it('should return -1 for elements not in the array', () => {
      expect(standardBinarySearch([1, 2, 3, 4, 5], 0)).toBe(-1);
      expect(standardBinarySearch([1, 2, 3, 4, 5], 6)).toBe(-1);
      expect(standardBinarySearch([1, 2, 3, 4, 5], 2.5)).toBe(-1);
    });

    it('should work with arrays of size 1', () => {
      expect(standardBinarySearch([1], 1)).toBe(0);
      expect(standardBinarySearch([1], 2)).toBe(-1);
    });

    it('should work with empty arrays', () => {
      expect(standardBinarySearch([], 1)).toBe(-1);
    });

    it('should work with large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(standardBinarySearch(largeArray, 500)).toBe(250);
      expect(standardBinarySearch(largeArray, 998)).toBe(499);
      expect(standardBinarySearch(largeArray, 999)).toBe(-1);
    });
  });

  describe('with string arrays', () => {
    it('should find elements in a sorted array', () => {
      expect(standardBinarySearch(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'cherry')).toBe(2);
      expect(standardBinarySearch(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'apple')).toBe(0);
      expect(standardBinarySearch(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'elderberry')).toBe(4);
    });

    it('should return -1 for elements not in the array', () => {
      expect(standardBinarySearch(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'apricot')).toBe(-1);
      expect(standardBinarySearch(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'fig')).toBe(-1);
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
      { name: 'Charlie', age: 30 },
      { name: 'David', age: 35 },
      { name: 'Eve', age: 40 }
    ];

    it('should find people by age using custom comparator', () => {
      const targetPerson: Person = { name: '', age: 30 };
      expect(standardBinarySearch(
        people,
        targetPerson,
        (person, target) => person.age - target.age
      )).toBe(2);

      const targetPerson2: Person = { name: '', age: 20 };
      expect(standardBinarySearch(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
      )).toBe(0);

      const targetPerson3: Person = { name: '', age: 40 };
      expect(standardBinarySearch(
        people,
        targetPerson3,
        (person, target) => person.age - target.age
      )).toBe(4);
    });

    it('should return -1 for ages not in the array', () => {
      const targetPerson: Person = { name: '', age: 22 };
      expect(standardBinarySearch(
        people,
        targetPerson,
        (person, target) => person.age - target.age
      )).toBe(-1);

      const targetPerson2: Person = { name: '', age: 45 };
      expect(standardBinarySearch(
        people,
        targetPerson2,
        (person, target) => person.age - target.age
      )).toBe(-1);
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Book {
      title: string;
      year: number;
      isbn: string;
    }

    const books: Book[] = [
      { title: 'Book A', year: 2000, isbn: '111-1111111111' },
      { title: 'Book B', year: 2005, isbn: '222-2222222222' },
      { title: 'Book C', year: 2010, isbn: '333-3333333333' },
      { title: 'Book D', year: 2015, isbn: '444-4444444444' },
      { title: 'Book E', year: 2020, isbn: '555-5555555555' }
    ];

    it('should find books by year', () => {
      const targetBook: Book = { title: '', year: 2010, isbn: '' };
      expect(standardBinarySearch(
        books,
        targetBook,
        (book, target) => book.year - target.year
      )).toBe(2);
    });

    it('should find books by isbn', () => {
      const targetBook: Book = { title: '', year: 0, isbn: '333-3333333333' };
      expect(standardBinarySearch(
        books,
        targetBook,
        (book, target) => book.isbn.localeCompare(target.isbn)
      )).toBe(2);
    });

    it('should return -1 for books not in the array', () => {
      const targetBook: Book = { title: '', year: 2012, isbn: '' };
      expect(standardBinarySearch(
        books,
        targetBook,
        (book, target) => book.year - target.year
      )).toBe(-1);

      const targetBook2: Book = { title: '', year: 0, isbn: '666-6666666666' };
      expect(standardBinarySearch(
        books,
        targetBook2,
        (book, target) => book.isbn.localeCompare(target.isbn)
      )).toBe(-1);
    });
  });
});