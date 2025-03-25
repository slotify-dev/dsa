import heapify from './heapify';
import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Heap Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - In-place sorting algorithm
 * - Unstable sort (relative order of equal elements might change)
 * - Guaranteed O(n log n) performance even in worst case
 * - Uses a binary heap data structure
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * heapSort([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * heapSort(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */
export default function heapSort<T>(
  arr: T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  const n = arr.length;

  if (n <= 1) {
    return arr;
  }

  // Build max heap (for ascending order)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n, comparator);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (max element) to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Call heapify on the reduced heap
    heapify(arr, 0, i, comparator);
  }

  return arr;
}

