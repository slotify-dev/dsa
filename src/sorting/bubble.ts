import defaultComparator, { type comparator } from '../utils/comparator';

/**
 * Bubble Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n) - when the array is already sorted (with optimization)
 * - Average Case: O(n²)
 * - Worst Case: O(n²) - when the array is sorted in reverse order
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Simple implementation
 * - Stable sort (preserves relative order of equal elements)
 * - In-place algorithm (requires constant extra space)
 * - Not suitable for large datasets due to quadratic time complexity
 * - Primarily used for educational purposes
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * bubble([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * bubble(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */
export default function bubbleSort<T>(
  arr: T[],
  comparator: comparator<T> = defaultComparator
): T[] {
  const n = arr.length;

  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (comparator(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return arr;
}