import defaultComparator from './default-comparator';

/**
 * Finds the index of the first element in a sorted array that is strictly greater than the target.
 * This is equivalent to the C++ upper_bound function.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - A sorted array of elements
 * @param target - The target value
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The index of the first element > target, or array.length if no such element exists
 * 
 * @example
 * // Find the first element > 5 in a number array
 * upperBound([1, 3, 5, 5, 5, 7, 9], 5); // returns 5
 * 
 * @example
 * // Find the first element > 6 in a number array
 * upperBound([1, 3, 5, 5, 5, 7, 9], 6); // returns 5
 * 
 * @example
 * // Find the first element > 9 in a number array
 * upperBound([1, 3, 5, 5, 5, 7, 9], 9); // returns 7
 * 
 * @example
 * // Find the first person with age > 25 in an array of objects
 * upperBound(
 *   [{ name: 'Alice', age: 20 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 30 }],
 *   25,
 *   (person, age) => person.age - age
 * ); // returns 2
 */
export default function upperBound<T>(
  array: readonly T[],
  target: T,
  comparator: (element: T, target: T) => number = defaultComparator
): number {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (comparator(array[mid], target) <= 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}