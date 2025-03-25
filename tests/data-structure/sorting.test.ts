import { describe, test, expect } from "bun:test";
import {
    heapSort,
    radixSort,
    mergeSort,
    quickSort,
    countingSort,
} from "../src/data-structure";

describe("Sorting Algorithms", () => {
    describe("mergeSort", () => {
        test("Sort empty array", () => {
            const array: number[] = [];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([]);
        });

        test("Sort array with one element", () => {
            const array = [5];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([5]);
        });

        test("Sort already sorted array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort reverse sorted array", () => {
            const array = [5, 4, 3, 2, 1];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort array with duplicate elements", () => {
            const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
        });

        test("Sort array with negative numbers", () => {
            const array = [3, -1, 4, -5, 2, -3];
            const result = mergeSort(array, (a, b) => a - b);
            expect(result).toEqual([-5, -3, -1, 2, 3, 4]);
        });

        test("Sort with custom comparator", () => {
            const array = ["banana", "apple", "cherry", "date"];
            const result = mergeSort(array, (a, b) => a.localeCompare(b));
            expect(result).toEqual(["apple", "banana", "cherry", "date"]);
        });

        test("Sort with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 3, name: "Charlie" },
                { id: 1, name: "Alice" },
                { id: 4, name: "Dave" },
                { id: 2, name: "Bob" }
            ];

            const result = mergeSort(array, (a, b) => a.id - b.id);
            expect(result.map(p => p.id)).toEqual([1, 2, 3, 4]);
            expect(result.map(p => p.name)).toEqual(["Alice", "Bob", "Charlie", "Dave"]);
        });

        test("Original array is not modified", () => {
            const array = [5, 3, 1, 4, 2];
            const originalArray = [...array];
            mergeSort(array, (a, b) => a - b);
            expect(array).toEqual(originalArray);
        });
    });

    describe("quickSort", () => {
        test("Sort empty array", () => {
            const array: number[] = [];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([]);
        });

        test("Sort array with one element", () => {
            const array = [5];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([5]);
        });

        test("Sort already sorted array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort reverse sorted array", () => {
            const array = [5, 4, 3, 2, 1];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort array with duplicate elements", () => {
            const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
        });

        test("Sort array with negative numbers", () => {
            const array = [3, -1, 4, -5, 2, -3];
            const result = quickSort(array, (a, b) => a - b);
            expect(result).toEqual([-5, -3, -1, 2, 3, 4]);
        });

        test("Sort with custom comparator", () => {
            const array = ["banana", "apple", "cherry", "date"];
            const result = quickSort(array, (a, b) => a.localeCompare(b));
            expect(result).toEqual(["apple", "banana", "cherry", "date"]);
        });

        test("Sort with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 3, name: "Charlie" },
                { id: 1, name: "Alice" },
                { id: 4, name: "Dave" },
                { id: 2, name: "Bob" }
            ];

            const result = quickSort(array, (a, b) => a.id - b.id);
            expect(result.map(p => p.id)).toEqual([1, 2, 3, 4]);
            expect(result.map(p => p.name)).toEqual(["Alice", "Bob", "Charlie", "Dave"]);
        });

        test("Original array is not modified", () => {
            const array = [5, 3, 1, 4, 2];
            const originalArray = [...array];
            quickSort(array, (a, b) => a - b);
            expect(array).toEqual(originalArray);
        });
    });

    describe("heapSort", () => {
        test("Sort empty array", () => {
            const array: number[] = [];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([]);
        });

        test("Sort array with one element", () => {
            const array = [5];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([5]);
        });

        test("Sort already sorted array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort reverse sorted array", () => {
            const array = [5, 4, 3, 2, 1];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort array with duplicate elements", () => {
            const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
        });

        test("Sort array with negative numbers", () => {
            const array = [3, -1, 4, -5, 2, -3];
            const result = heapSort(array, (a, b) => a - b);
            expect(result).toEqual([-5, -3, -1, 2, 3, 4]);
        });

        test("Sort with custom comparator", () => {
            const array = ["banana", "apple", "cherry", "date"];
            const result = heapSort(array, (a, b) => a.localeCompare(b));
            expect(result).toEqual(["apple", "banana", "cherry", "date"]);
        });

        test("Sort with custom objects", () => {
            interface Person {
                id: number;
                name: string;
            }

            const array: Person[] = [
                { id: 3, name: "Charlie" },
                { id: 1, name: "Alice" },
                { id: 4, name: "Dave" },
                { id: 2, name: "Bob" }
            ];

            const result = heapSort(array, (a, b) => a.id - b.id);
            expect(result.map(p => p.id)).toEqual([1, 2, 3, 4]);
            expect(result.map(p => p.name)).toEqual(["Alice", "Bob", "Charlie", "Dave"]);
        });

        test("Original array is not modified", () => {
            const array = [5, 3, 1, 4, 2];
            const originalArray = [...array];
            heapSort(array, (a, b) => a - b);
            expect(array).toEqual(originalArray);
        });
    });

    describe("countingSort", () => {
        test("Sort empty array", () => {
            const array: number[] = [];
            const result = countingSort(array);
            expect(result).toEqual([]);
        });

        test("Sort array with one element", () => {
            const array = [5];
            const result = countingSort(array);
            expect(result).toEqual([5]);
        });

        test("Sort already sorted array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = countingSort(array);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort reverse sorted array", () => {
            const array = [5, 4, 3, 2, 1];
            const result = countingSort(array);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort array with duplicate elements", () => {
            const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
            const result = countingSort(array);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
        });

        test("Sort array with zero", () => {
            const array = [3, 0, 4, 0, 2];
            const result = countingSort(array);
            expect(result).toEqual([0, 0, 2, 3, 4]);
        });

        test("Sort array with large range", () => {
            const array = [100, 5, 200, 10, 150];
            const result = countingSort(array);
            expect(result).toEqual([5, 10, 100, 150, 200]);
        });

        test("Original array is not modified", () => {
            const array = [5, 3, 1, 4, 2];
            const originalArray = [...array];
            countingSort(array);
            expect(array).toEqual(originalArray);
        });
    });

    describe("radixSort", () => {
        test("Sort empty array", () => {
            const array: number[] = [];
            const result = radixSort(array);
            expect(result).toEqual([]);
        });

        test("Sort array with one element", () => {
            const array = [5];
            const result = radixSort(array);
            expect(result).toEqual([5]);
        });

        test("Sort already sorted array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = radixSort(array);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort reverse sorted array", () => {
            const array = [5, 4, 3, 2, 1];
            const result = radixSort(array);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test("Sort array with duplicate elements", () => {
            const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
            const result = radixSort(array);
            expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
        });

        test("Sort array with zero", () => {
            const array = [3, 0, 4, 0, 2];
            const result = radixSort(array);
            expect(result).toEqual([0, 0, 2, 3, 4]);
        });

        test("Sort array with multi-digit numbers", () => {
            const array = [170, 45, 75, 90, 802, 24, 2, 66];
            const result = radixSort(array);
            expect(result).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
        });

        test("Sort array with large numbers", () => {
            const array = [10000, 1000, 100, 10, 1];
            const result = radixSort(array);
            expect(result).toEqual([1, 10, 100, 1000, 10000]);
        });

        test("Original array is not modified", () => {
            const array = [5, 3, 1, 4, 2];
            const originalArray = [...array];
            radixSort(array);
            expect(array).toEqual(originalArray);
        });
    });

    describe("Comparison of sorting algorithms", () => {
        test("All algorithms produce the same result", () => {
            const array = [38, 27, 43, 3, 9, 82, 10];

            const mergeSortResult = mergeSort(array, (a, b) => a - b);
            const quickSortResult = quickSort(array, (a, b) => a - b);
            const heapSortResult = heapSort(array, (a, b) => a - b);
            const countingSortResult = countingSort(array);
            const radixSortResult = radixSort(array);

            const expectedResult = [3, 9, 10, 27, 38, 43, 82];

            expect(mergeSortResult).toEqual(expectedResult);
            expect(quickSortResult).toEqual(expectedResult);
            expect(heapSortResult).toEqual(expectedResult);
            expect(countingSortResult).toEqual(expectedResult);
            expect(radixSortResult).toEqual(expectedResult);
        });

        test("All algorithms handle edge cases", () => {
            // Empty array
            const emptyArray: number[] = [];
            expect(mergeSort(emptyArray, (a, b) => a - b)).toEqual([]);
            expect(quickSort(emptyArray, (a, b) => a - b)).toEqual([]);
            expect(heapSort(emptyArray, (a, b) => a - b)).toEqual([]);
            expect(countingSort(emptyArray)).toEqual([]);
            expect(radixSort(emptyArray)).toEqual([]);

            // Single element array
            const singleElementArray = [42];
            expect(mergeSort(singleElementArray, (a, b) => a - b)).toEqual([42]);
            expect(quickSort(singleElementArray, (a, b) => a - b)).toEqual([42]);
            expect(heapSort(singleElementArray, (a, b) => a - b)).toEqual([42]);
            expect(countingSort(singleElementArray)).toEqual([42]);
            expect(radixSort(singleElementArray)).toEqual([42]);

            // Already sorted array
            const sortedArray = [1, 2, 3, 4, 5];
            expect(mergeSort(sortedArray, (a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
            expect(quickSort(sortedArray, (a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
            expect(heapSort(sortedArray, (a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
            expect(countingSort(sortedArray)).toEqual([1, 2, 3, 4, 5]);
            expect(radixSort(sortedArray)).toEqual([1, 2, 3, 4, 5]);
        });
    });
});