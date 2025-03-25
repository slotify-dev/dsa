import { describe, test, expect } from "bun:test";
import {
    binarySearch,
    binarySearchInsertPosition,
    binarySearchFirstOccurrence,
    binarySearchLastOccurrence
} from "../src/data-structure";

describe("Binary Search Algorithms", () => {
    describe("binarySearch", () => {
        test("Search in empty array", () => {
            const array: number[] = [];
            const result = binarySearch(array, 5, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Search for existing element", () => {
            const array = [1, 3, 5, 7, 9, 11];
            const result = binarySearch(array, 5, (a, b) => a - b);
            expect(result).toBe(2); // Index of 5
        });

        test("Search for non-existing element", () => {
            const array = [1, 3, 5, 7, 9, 11];
            const result = binarySearch(array, 6, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Search in array with one element - found", () => {
            const array = [5];
            const result = binarySearch(array, 5, (a, b) => a - b);
            expect(result).toBe(0);
        });

        test("Search in array with one element - not found", () => {
            const array = [5];
            const result = binarySearch(array, 10, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Search for first element", () => {
            const array = [1, 3, 5, 7, 9, 11];
            const result = binarySearch(array, 1, (a, b) => a - b);
            expect(result).toBe(0);
        });

        test("Search for last element", () => {
            const array = [1, 3, 5, 7, 9, 11];
            const result = binarySearch(array, 11, (a, b) => a - b);
            expect(result).toBe(5);
        });

        test("Search with custom comparator", () => {
            const array = ["apple", "banana", "cherry", "date", "elderberry"];
            const result = binarySearch(array, "cherry", (a, b) => a.localeCompare(b));
            expect(result).toBe(2);
        });

        test("Search with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 3, name: "Charlie" },
                { id: 4, name: "Dave" }
            ];

            const result = binarySearch(array, { id: 3, name: "Charlie" }, (a, b) => a.id - b.id);
            expect(result).toBe(2);
        });

        test("Search in array with duplicate elements", () => {
            const array = [1, 3, 5, 5, 5, 7, 9];
            const result = binarySearch(array, 5, (a, b) => a - b);
            // Binary search should return any index where the element is found
            expect([2, 3, 4]).toContain(result);
        });
    });

    describe("binarySearchInsertPosition", () => {
        test("Find insert position in empty array", () => {
            const array: number[] = [];
            const result = binarySearchInsertPosition(array, 5, (a, b) => a - b);
            expect(result).toBe(0);
        });

        test("Find insert position for element smaller than all elements", () => {
            const array = [3, 5, 7, 9];
            const result = binarySearchInsertPosition(array, 1, (a, b) => a - b);
            expect(result).toBe(0);
        });

        test("Find insert position for element larger than all elements", () => {
            const array = [3, 5, 7, 9];
            const result = binarySearchInsertPosition(array, 10, (a, b) => a - b);
            expect(result).toBe(4);
        });

        test("Find insert position for element in the middle", () => {
            const array = [3, 5, 7, 9];
            const result = binarySearchInsertPosition(array, 6, (a, b) => a - b);
            expect(result).toBe(2);
        });

        test("Find insert position for existing element", () => {
            const array = [3, 5, 7, 9];
            const result = binarySearchInsertPosition(array, 5, (a, b) => a - b);
            expect(result).toBe(1);
        });

        test("Find insert position with custom comparator", () => {
            const array = ["apple", "cherry", "elderberry"];
            const result = binarySearchInsertPosition(array, "banana", (a, b) => a.localeCompare(b));
            expect(result).toBe(1);
        });

        test("Find insert position with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 1, name: "Alice" },
                { id: 3, name: "Charlie" },
                { id: 5, name: "Eve" }
            ];

            const result = binarySearchInsertPosition(array, { id: 4, name: "Dave" }, (a, b) => a.id - b.id);
            expect(result).toBe(2);
        });
    });

    describe("binarySearchFirstOccurrence", () => {
        test("Find first occurrence in empty array", () => {
            const array: number[] = [];
            const result = binarySearchFirstOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Find first occurrence when element doesn't exist", () => {
            const array = [1, 3, 5, 7, 9];
            const result = binarySearchFirstOccurrence(array, 4, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Find first occurrence when element appears once", () => {
            const array = [1, 3, 5, 7, 9];
            const result = binarySearchFirstOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(2);
        });

        test("Find first occurrence when element appears multiple times", () => {
            const array = [1, 3, 5, 5, 5, 7, 9];
            const result = binarySearchFirstOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(2);
        });

        test("Find first occurrence when element is at the beginning", () => {
            const array = [5, 5, 5, 7, 9];
            const result = binarySearchFirstOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(0);
        });

        test("Find first occurrence when element is at the end", () => {
            const array = [1, 3, 5, 7, 9, 9, 9];
            const result = binarySearchFirstOccurrence(array, 9, (a, b) => a - b);
            expect(result).toBe(4);
        });

        test("Find first occurrence with custom comparator", () => {
            const array = ["apple", "banana", "banana", "banana", "cherry"];
            const result = binarySearchFirstOccurrence(array, "banana", (a, b) => a.localeCompare(b));
            expect(result).toBe(1);
        });

        test("Find first occurrence with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 3, name: "Charlie" },
                { id: 3, name: "Charlie" }, // Duplicate
                { id: 3, name: "Charlie" }, // Duplicate
                { id: 4, name: "Dave" }
            ];

            const result = binarySearchFirstOccurrence(array, { id: 3, name: "Charlie" }, (a, b) => a.id - b.id);
            expect(result).toBe(2);
        });
    });

    describe("binarySearchLastOccurrence", () => {
        test("Find last occurrence in empty array", () => {
            const array: number[] = [];
            const result = binarySearchLastOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Find last occurrence when element doesn't exist", () => {
            const array = [1, 3, 5, 7, 9];
            const result = binarySearchLastOccurrence(array, 4, (a, b) => a - b);
            expect(result).toBe(-1);
        });

        test("Find last occurrence when element appears once", () => {
            const array = [1, 3, 5, 7, 9];
            const result = binarySearchLastOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(2);
        });

        test("Find last occurrence when element appears multiple times", () => {
            const array = [1, 3, 5, 5, 5, 7, 9];
            const result = binarySearchLastOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(4);
        });

        test("Find last occurrence when element is at the beginning", () => {
            const array = [5, 5, 5, 7, 9];
            const result = binarySearchLastOccurrence(array, 5, (a, b) => a - b);
            expect(result).toBe(2);
        });

        test("Find last occurrence when element is at the end", () => {
            const array = [1, 3, 5, 7, 9, 9, 9];
            const result = binarySearchLastOccurrence(array, 9, (a, b) => a - b);
            expect(result).toBe(6);
        });

        test("Find last occurrence with custom comparator", () => {
            const array = ["apple", "banana", "banana", "banana", "cherry"];
            const result = binarySearchLastOccurrence(array, "banana", (a, b) => a.localeCompare(b));
            expect(result).toBe(3);
        });

        test("Find last occurrence with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
                { id: 3, name: "Charlie" },
                { id: 3, name: "Charlie" }, // Duplicate
                { id: 3, name: "Charlie" }, // Duplicate
                { id: 4, name: "Dave" }
            ];

            const result = binarySearchLastOccurrence(array, { id: 3, name: "Charlie" }, (a, b) => a.id - b.id);
            expect(result).toBe(4);
        });
    });
});