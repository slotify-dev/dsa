import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Searches for a target value in a rotated sorted array.
 * A rotated sorted array is a sorted array that has been rotated at some pivot point.
 * For example, [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - A rotated sorted array of elements with no duplicates
 * @param target - The target value
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The index of the target if found, otherwise -1
 * 
 * @example
 * // Find 0 in a rotated number array
 * searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0); // returns 4
 * 
 * @example
 * // Find 3 in a rotated number array
 * searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3); // returns -1
 * 
 * @example
 * // Find a person with age 25 in a rotated array of objects
 * searchRotatedArray(
 *   [{ age: 30 }, { age: 40 }, { age: 10 }, { age: 20 }, { age: 25 }],
 *   25,
 *   (person, age) => person.age - age
 * ); // returns 4
 */
export default function searchRotatedArray<T>(
  array: readonly T[],
  target: T,
  comparator: Comparator<T> = defaultComparator
): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    const midCompare = comparator(array[mid], target);
    if (midCompare === 0) {
      return mid;
    }

    // Check if the left half is sorted
    const leftCompare = comparator(array[left], array[mid]);
    if (leftCompare <= 0) {
      // Check if target is in the left half
      const leftTargetCompare = comparator(array[left], target);
      const midTargetCompare = comparator(target, array[mid]);
      if (leftTargetCompare <= 0 && midTargetCompare < 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      // Check if target is in the right half
      const targetMidCompare = comparator(target, array[mid]);
      const targetRightCompare = comparator(target, array[right]);
      if (targetMidCompare > 0 && targetRightCompare <= 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1; // Target not found
}