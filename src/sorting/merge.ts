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
 * - Not in-place (requires extra memory)
 * - Efficient for external sorting (when data doesn't fit in memory)
 * - Uses divide-and-conquer strategy
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements
 * @returns A new sorted array
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
export default function merge<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  // Base case: arrays with 0 or 1 elements are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Find the middle point to divide the array
  const middle = Math.floor(arr.length / 2);
  
  // Divide the array into two halves
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  // Recursively sort both halves
  return mergeArrays(merge(left, comparator), merge(right, comparator), comparator);
}

/**
 * Merges two sorted arrays into a single sorted array
 * 
 * @param left - The left sorted array
 * @param right - The right sorted array
 * @param comparator - Function to compare elements
 * @returns A new merged and sorted array
 */
function mergeArrays<T>(
  left: T[], 
  right: T[],
  comparator: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add any remaining elements from the left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  
  // Add any remaining elements from the right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  
  return result;
}