import defaultComparator, { type comparator } from '../utils/comparator';

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
  comparator: comparator<T> = defaultComparator
): number {
  const pivot = arr[high];

  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (comparator(arr[j], pivot) < 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

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
  comparator: comparator<T> = defaultComparator
): number {
  const pivot = arr[Math.floor((low + high) / 2)];

  let i = low - 1;
  let j = high + 1;

  while (true) {
    do {
      i++;
    } while (comparator(arr[i], pivot) < 0);

    do {
      j--;
    } while (comparator(arr[j], pivot) > 0);

    if (i >= j) {
      return j;
    }

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}