import defaultComparator, { type comparator } from '../utils/comparator';

/**
 * Standard binary search implementation to find a target value in a sorted array.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - A sorted array of elements
 * @param target - The value to search for
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The index of the target if found, otherwise -1
 * 
 * @example
 * // Find the index of 7 in a sorted number array
 * standardBinarySearch([1, 2, 3, 5, 7, 9], 7); // returns 4
 * 
 * @example
 * // Search for a value that doesn't exist in a number array
 * standardBinarySearch([1, 2, 3, 5, 7, 9], 6); // returns -1
 * 
 * @example
 * // Find a person by age in an array of objects
 * standardBinarySearch(
 *   [{ name: 'Alice', age: 20 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 30 }],
 *   25,
 *   (person, age) => person.age - age
 * ); // returns 1
 */
export default function standardBinarySearch<T>(
  array: readonly T[],
  target: T,
  comparator: comparator<T> = defaultComparator
): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const comparisonResult = comparator(array[mid], target);

    if (comparisonResult === 0) {
      return mid; // Target found
    } else if (comparisonResult < 0) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}