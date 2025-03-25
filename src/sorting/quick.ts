import { lomutoPartition } from './partition';
import defaultComparator, { type comparator } from '../utils/comparator';

/**
 * Helper function that performs the recursive quick sort
 * 
 * @param arr - The array to be sorted
 * @param low - Starting index
 * @param high - Ending index
 * @param comparator - Function to compare elements
 */
function quickHelper<T>(
  arr: T[],
  low: number,
  high: number,
  comparator: comparator<T>
): void {
  if (low < high) {
    const pivotIndex = lomutoPartition(arr, low, high, comparator);

    quickHelper(arr, low, pivotIndex - 1, comparator);
    quickHelper(arr, pivotIndex + 1, high, comparator);
  }
}

/**
 * Quick Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n²) - occurs with already sorted arrays or arrays with many duplicates
 * 
 * Space Complexity: O(log n) - due to recursion stack
 * 
 * Characteristics:
 * - In-place sorting algorithm (doesn't require extra space)
 * - Unstable sort (relative order of equal elements might change)
 * - Generally fastest sorting algorithm in practice for random data
 * - Uses divide-and-conquer strategy
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * quick([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * quick(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */
export default function quickSort<T>(
  arr: T[],
  comparator: comparator<T> = defaultComparator
): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  quickHelper(arr, 0, arr.length - 1, comparator);
  return arr;
}

