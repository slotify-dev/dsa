import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Tim Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 * 
 * Space Complexity: O(n)
 * 
 * Characteristics:
 * - Hybrid sorting algorithm derived from merge sort and insertion sort
 * - Stable sort (preserves relative order of equal elements)
 * - Adaptive (performs better on partially sorted data)
 * - Used as the default sorting algorithm in Python, Java, and many other languages
 * - Designed for real-world data with patterns
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * tim([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * tim(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */

const MIN_RUN = 32;

export default function timSort<T>(
  arr: T[],
  comparator: Comparator<T> = defaultComparator
): T[] {
  const n = arr.length;

  if (n <= 1) {
    return arr;
  }

  // Sort individual subarrays of size MIN_RUN or less using insertion sort
  for (let i = 0; i < n; i += MIN_RUN) {
    insertionSort(arr, i, Math.min(i + MIN_RUN - 1, n - 1), comparator);
  }

  // Start merging from size MIN_RUN
  for (let size = MIN_RUN; size < n; size = 2 * size) {
    // Pick starting point of left subarray
    for (let left = 0; left < n; left += 2 * size) {
      // Find ending point of left subarray
      const mid = left + size - 1;
      // Find ending point of right subarray
      const right = Math.min(left + 2 * size - 1, n - 1);

      // Merge subarrays arr[left...mid] and arr[mid+1...right]
      if (mid < right) {
        mergeSort(arr, left, mid, right, comparator);
      }
    }
  }

  return arr;
}

/**
 * Performs insertion sort on a subarray
 * 
 * @param arr - The array to be sorted
 * @param left - Left boundary of the subarray
 * @param right - Right boundary of the subarray
 * @param comparator - Function to compare elements
 */
function insertionSort<T>(
  arr: T[],
  left: number,
  right: number,
  comparator: Comparator<T>
): void {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;

    while (j >= left && comparator(arr[j], temp) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
  }
}

/**
 * Merges two sorted subarrays into one
 * 
 * @param arr - The array containing the subarrays
 * @param left - Start index of the first subarray
 * @param mid - End index of the first subarray
 * @param right - End index of the second subarray
 * @param comparator - Function to compare elements
 */
function mergeSort<T>(
  arr: T[],
  left: number,
  mid: number,
  right: number,
  comparator: Comparator<T>
): void {
  // Calculate lengths of two subarrays to be merged
  const len1 = mid - left + 1;
  const len2 = right - mid;

  // Create temporary arrays
  const leftArr = new Array(len1);
  const rightArr = new Array(len2);

  // Copy data to temporary arrays
  for (let i = 0; i < len1; i++) {
    leftArr[i] = arr[left + i];
  }
  for (let i = 0; i < len2; i++) {
    rightArr[i] = arr[mid + 1 + i];
  }

  // Merge the temporary arrays back into arr[left...right]
  let i = 0;    // Initial index of first subarray
  let j = 0;    // Initial index of second subarray
  let k = left; // Initial index of merged subarray

  // Compare and merge the two arrays
  while (i < len1 && j < len2) {
    if (comparator(leftArr[i], rightArr[j]) <= 0) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements of leftArr[] if any
  while (i < len1) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // Copy remaining elements of rightArr[] if any
  while (j < len2) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}