import partition from './partition';

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
 * @param comparator - Optional function to compare elements
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
export default function quick<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  // Base case: arrays with 0 or 1 elements are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Call the helper function with the full array range
  quickHelper(arr, 0, arr.length - 1, comparator);
  return arr;
}

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
  comparator: (a: T, b: T) => number
): void {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition.lomutoPartition(arr, low, high, comparator);
    
    // Recursively sort the sub-arrays
    quickHelper(arr, low, pivotIndex - 1, comparator);
    quickHelper(arr, pivotIndex + 1, high, comparator);
  }
}