import defaultComparator, { type Comparator } from '../utils/comparator';

/**
 * Finds the starting and ending position of a target value in a sorted array.
 * This is equivalent to finding the first and last occurrence of the target.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - A sorted array of elements
 * @param target - The target value
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns An array containing the starting and ending positions, or [-1, -1] if not found
 * 
 * @example
 * // Find the range of 5 in a number array
 * searchRange([1, 3, 5, 5, 5, 7, 9], 5); // returns [2, 4]
 * 
 * @example
 * // Find the range of 6 in a number array
 * searchRange([1, 3, 5, 5, 5, 7, 9], 6); // returns [-1, -1]
 * 
 * @example
 * // Find the range of people with age 25 in an array of objects
 * searchRange(
 *   [{ name: 'Alice', age: 20 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 25 }, { name: 'Dave', age: 30 }],
 *   25,
 *   (person, age) => person.age - age
 * ); // returns [1, 2]
 */
export default function searchRange<T>(
  array: readonly T[],
  target: T,
  comparator: Comparator<T> = defaultComparator
): [number, number] {
  const findFirst = (): number => {
    let left = 0;
    let right = array.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const comparisonResult = comparator(array[mid], target);

      if (comparisonResult >= 0) {
        right = mid - 1;
        if (comparisonResult === 0) {
          result = mid;
        }
      } else {
        left = mid + 1;
      }
    }

    return result;
  };

  const findLast = (): number => {
    let left = 0;
    let right = array.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const comparisonResult = comparator(array[mid], target);

      if (comparisonResult <= 0) {
        left = mid + 1;
        if (comparisonResult === 0) {
          result = mid;
        }
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  return [findFirst(), findLast()];
}