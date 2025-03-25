import defaultComparator from './default-comparator';

/**
 * Finds the index where a target should be inserted in a sorted array to maintain order.
 * If the target already exists, returns the index of the target.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param array - A sorted array of elements
 * @param target - The target value
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The index where the target should be inserted
 * 
 * @example
 * // Find where to insert 5 in a number array
 * searchInsertPosition([1, 3, 6, 7], 5); // returns 2
 * 
 * @example
 * // Find where to insert 0 in a number array
 * searchInsertPosition([1, 3, 6, 7], 0); // returns 0
 * 
 * @example
 * // Find where to insert 8 in a number array
 * searchInsertPosition([1, 3, 6, 7], 8); // returns 4
 * 
 * @example
 * // Find where to insert a person with age 25 in an array of objects
 * searchInsertPosition(
 *   [{ name: 'Alice', age: 20 }, { name: 'Bob', age: 30 }],
 *   25,
 *   (person, age) => person.age - age
 * ); // returns 1
 */
export default function searchInsertPosition<T, U = T>(
  array: T[],
  target: U,
  comparator: (element: T, target: U) => number = defaultComparator
): number {
  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    const comparisonResult = comparator(array[mid], target);
    
    if (comparisonResult === 0) {
      return mid;
    } else if (comparisonResult < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  // At this point, left > right
  // 'left' is the position where the target should be inserted
  return left;
}