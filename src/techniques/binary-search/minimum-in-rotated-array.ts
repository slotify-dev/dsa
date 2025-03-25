import defaultComparator from './default-comparator';

/**
 * Finds the minimum element in a rotated sorted array.
 * A rotated sorted array is a sorted array that has been rotated at some pivot point.
 * For example, [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].
 * 
 * This implementation handles arrays with duplicate elements.
 * 
 * Time Complexity: O(log n) in the average case, O(n) in the worst case with many duplicates
 * Space Complexity: O(1)
 * 
 * @param array - A rotated sorted array of elements (may contain duplicates)
 * @param comparator - Optional function to compare elements. Uses utils/comparator by default.
 * @returns The minimum element in the array, or -1 if the array is empty
 * 
 * @example
 * // Find minimum in a number array [4, 5, 6, 7, 0, 1, 2]
 * minimumInRotatedArray([4, 5, 6, 7, 0, 1, 2]); // returns 0
 * 
 * @example
 * // Find minimum in a number array [3, 4, 5, 1, 2]
 * minimumInRotatedArray([3, 4, 5, 1, 2]); // returns 1
 * 
 * @example
 * // Find minimum in array with duplicates
 * minimumInRotatedArray([3, 3, 1, 3]); // returns 1
 * 
 * @example
 * // Find person with minimum age in a rotated array of objects
 * minimumInRotatedArray(
 *   [{ age: 30 }, { age: 40 }, { age: 20 }, { age: 25 }],
 *   (a, b) => a.age - b.age
 * ); // returns { age: 20 }
 * 
 * @example
 * // Handle empty array
 * minimumInRotatedArray([]); // returns -1
 */
export default function minimumInRotatedArray<T>(
  array: T[],
  comparator: (a: T, b: T) => number = defaultComparator
): T | number {
  let left = 0;
  let right = array.length - 1;
  
  // If the array is empty
  if (array.length === 0) {
    return -1;
  }
  
  // If the array has only one element
  if (left === right) {
    return array[left];
  }
  
  // If the array is not rotated (already sorted)
  if (comparator(array[left], array[right]) < 0) {
    return array[left];
  }
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    // If mid element is greater than the rightmost element,
    // the minimum must be in the right half
    if (comparator(array[mid], array[right]) > 0) {
      left = mid + 1;
    } 
    // If mid element is less than the rightmost element,
    // the minimum must be in the left half or at mid
    else if (comparator(array[mid], array[right]) < 0) {
      right = mid;
    }
    // If mid element equals the rightmost element,
    // we can't determine which half has the minimum,
    // so we decrement right to eliminate one duplicate
    else {
      right--;
    }
  }
  
  // At this point, left == right, and this is the minimum element
  return array[left];
}