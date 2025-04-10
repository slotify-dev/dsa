import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Partition implementation for quicksort and related algorithms
 * 
 * This file implements the partition operation used in quicksort and other
 * divide-and-conquer algorithms.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Lomuto partition scheme
 * Partitions the array around a pivot element (typically the last element)
 * 
 * @param arr - The array to be partitioned
 * @param low - Starting index
 * @param high - Ending index (pivot is chosen from this position)
 * @param comparator - Function to compare elements. Uses utils/comparator by default.
 * @returns The final position of the pivot element
 */
export function lomutoPartition<T>(
  arr: T[],
  low: number,
  high: number,
  comparator: Comparator<T> = defaultComparator
): number {
  // Choose the rightmost element as pivot
  const pivot = arr[high];

  // Index of smaller element
  let i = low - 1;

  // Traverse through all elements
  // compare each element with pivot
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (comparator(arr[j], pivot) < 0) {
      // Increment index of smaller element
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place the pivot element at its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  // Return the position where partition is done
  return i + 1;
}

/**
 * Hoare partition scheme
 * Generally more efficient than Lomuto's partition scheme
 * 
 * @param arr - The array to be partitioned
 * @param low - Starting index
 * @param high - Ending index
 * @param comparator - Function to compare elements. Uses utils/comparator by default.
 * @returns The final position for partitioning
 */
export function hoarePartition<T>(
  arr: T[],
  low: number,
  high: number,
  comparator: Comparator<T> = defaultComparator
): number {
  // Choose the middle element as pivot
  const pivot = arr[Math.floor((low + high) / 2)];

  let i = low - 1;
  let j = high + 1;

  while (true) {
    // Find leftmost element greater than or equal to pivot
    do {
      i++;
    } while (comparator(arr[i], pivot) < 0);

    // Find rightmost element less than or equal to pivot
    do {
      j--;
    } while (comparator(arr[j], pivot) > 0);

    // If two pointers met
    if (i >= j) {
      return j;
    }

    // Swap elements
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export default lomutoPartition;