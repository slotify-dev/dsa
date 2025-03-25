import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Finds a peak element in an array.
 * A peak element is an element that is strictly greater than its neighbors.
 * For boundary elements, we only need to compare with the inner neighbor.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - An array of elements
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The index of any peak element
 * 
 * @example
 * // Find a peak in a number array [1, 2, 3, 1]
 * peakElement([1, 2, 3, 1]); // returns 2
 * 
 * @example
 * // Find a peak in a number array [1, 2, 1, 3, 5, 6, 4]
 * peakElement([1, 2, 1, 3, 5, 6, 4]); // returns 5 or 1
 * 
 * @example
 * // Find a peak in an array of objects based on age
 * peakElement(
 *   [{ age: 20 }, { age: 30 }, { age: 25 }],
 *   (a, b) => a.age - b.age
 * ); // returns 1
 */
export default function peakElement<T>(
  array: readonly T[],
  comparator: Comparator<T> = defaultComparator
): number {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    // If mid is less than its right neighbor, a peak must exist on the right side
    if (comparator(array[mid], array[mid + 1]) < 0) {
      left = mid + 1;
    }
    // Otherwise, a peak must exist on the left side or at mid
    else {
      right = mid;
    }
  }

  // At this point, left == right, and this is a peak element
  return left;
}