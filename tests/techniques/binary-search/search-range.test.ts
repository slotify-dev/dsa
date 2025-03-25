import { describe, it, expect } from 'bun:test';
import { searchRange } from '../../../src/binary-search';

describe('searchRange', () => {
  describe('with number arrays', () => {
    it('should find the starting and ending positions of a target', () => {
      expect(searchRange([1, 3, 5, 5, 5, 7, 9], 5)).toEqual([2, 4]);
      expect(searchRange([1, 2, 3, 4, 5], 3)).toEqual([2, 2]);
      expect(searchRange([1, 1, 1, 1, 1], 1)).toEqual([0, 4]);
    });

    it('should return [-1, -1] if target is not found', () => {
      expect(searchRange([1, 3, 5, 7, 9], 6)).toEqual([-1, -1]);
      expect(searchRange([1, 3, 5, 7, 9], 0)).toEqual([-1, -1]);
      expect(searchRange([1, 3, 5, 7, 9], 10)).toEqual([-1, -1]);
    });

    it('should work with arrays of size 1', () => {
      expect(searchRange([5], 5)).toEqual([0, 0]);
      expect(searchRange([5], 6)).toEqual([-1, -1]);
    });

    it('should work with empty arrays', () => {
      expect(searchRange([], 5)).toEqual([-1, -1]);
    });

    it('should work with targets at the boundaries', () => {
      expect(searchRange([1, 1, 2, 3, 4, 5], 1)).toEqual([0, 1]);
      expect(searchRange([1, 2, 3, 4, 5, 5], 5)).toEqual([4, 5]);
    });
  });

  describe('with string arrays', () => {
    it('should find the starting and ending positions of a target', () => {
      expect(searchRange(['apple', 'banana', 'cherry', 'cherry', 'cherry', 'date', 'elderberry'], 'cherry')).toEqual([2, 4]);
      expect(searchRange(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'banana')).toEqual([1, 1]);
      expect(searchRange(['apple', 'apple', 'apple', 'apple', 'apple'], 'apple')).toEqual([0, 4]);
    });

    it('should return [-1, -1] if target is not found', () => {
      expect(searchRange(['apple', 'banana', 'cherry', 'date', 'elderberry'], 'fig')).toEqual([-1, -1]);
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
      { name: 'David', age: 25 },
      { name: 'Eve', age: 30 }
    ];

    it('should find the starting and ending positions of people with a specific age', () => {
      expect(searchRange(
        people,
        25,
        (person, age) => person.age - age
      )).toEqual([1, 3]);

      expect(searchRange(
        people,
        20,
        (person, age) => person.age - age
      )).toEqual([0, 0]);

      expect(searchRange(
        people,
        30,
        (person, age) => person.age - age
      )).toEqual([4, 4]);
    });

    it('should return [-1, -1] if no person with the target age is found', () => {
      expect(searchRange(
        people,
        22,
        (person, age) => person.age - age
      )).toEqual([-1, -1]);
    });
  });

  describe('with custom comparator for complex objects', () => {
    interface Book {
      title: string;
      genre: string;
      year: number;
    }

    const books: Book[] = [
      { title: 'Book A', genre: 'Fiction', year: 2010 },
      { title: 'Book B', genre: 'Science', year: 2015 },
      { title: 'Book C', genre: 'Science', year: 2015 },
      { title: 'Book D', genre: 'Science', year: 2015 },
      { title: 'Book E', genre: 'History', year: 2020 }
    ];

    it('should find the range of books with a specific genre', () => {
      expect(searchRange(
        books,
        'Science',
        (book, genre) => book.genre.localeCompare(genre)
      )).toEqual([1, 3]);
    });

    it('should find the range of books published in a specific year', () => {
      expect(searchRange(
        books,
        2015,
        (book, year) => book.year - year
      )).toEqual([1, 3]);
    });

    it('should return [-1, -1] if no book with the target attribute is found', () => {
      expect(searchRange(
        books,
        'Mystery',
        (book, genre) => book.genre.localeCompare(genre)
      )).toEqual([-1, -1]);
    });
  });
});