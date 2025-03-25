import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Merge Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 * 
 * Space Complexity: O(n) - requires additional space for merging
 * 
 * Characteristics:
 * - Stable sort (preserves relative order of equal elements)
 * - Modified to be in-place (modifies the original array)
 * - Efficient for external sorting (when data doesn't fit in memory)
 * - Uses divide-and-conquer strategy
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * merge([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * merge(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */
export default function mergeSort<T>(
  arr: T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  // Create a temporary array to store the sorted result
  const temp = new Array(arr.length);

  // Call the helper function to perform the merge sort
  mergeSortHelper(arr, 0, arr.length - 1, temp, comparator);

  return arr;
}

/**
 * Helper function to perform merge sort recursively
 * 
 * @param arr - The array to be sorted
 * @param left - The left index of the current subarray
 * @param right - The right index of the current subarray
 * @param temp - Temporary array for merging
 * @param comparator - Function to compare elements
 */
function mergeSortHelper<T>(
  arr: T[],
  left: number,
  right: number,
  temp: T[],
  comparator: Comparator<T>
): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Sort the left half
    mergeSortHelper(arr, left, mid, temp, comparator);

    // Sort the right half
    mergeSortHelper(arr, mid + 1, right, temp, comparator);

    // Merge the sorted halves
    merge(arr, left, mid, right, temp, comparator);
  }
}

/**
 * Merges two sorted subarrays into a single sorted subarray
 * 
 * @param arr - The array containing the subarrays
 * @param left - The left index of the first subarray
 * @param mid - The middle index separating the two subarrays
 * @param right - The right index of the second subarray
 * @param temp - Temporary array for merging
 * @param comparator - Function to compare elements
 */
function merge<T>(
  arr: T[],
  left: number,
  mid: number,
  right: number,
  temp: T[],
  comparator: Comparator<T>
): void {
  // Copy both parts into the temporary array
  for (let i = left; i <= right; i++) {
    temp[i] = arr[i];
  }

  let i = left;      // Pointer for the left subarray
  let j = mid + 1;   // Pointer for the right subarray
  let k = left;      // Pointer for the merged array

  // Merge the two subarrays back into the original array
  while (i <= mid && j <= right) {
    if (comparator(temp[i], temp[j]) <= 0) {
      arr[k++] = temp[i++];
    } else {
      arr[k++] = temp[j++];
    }
  }

  // Copy any remaining elements from the left subarray
  while (i <= mid) {
    arr[k++] = temp[i++];
  }

  // Note: We don't need to copy remaining elements from the right subarray
  // as they are already in the correct position
}