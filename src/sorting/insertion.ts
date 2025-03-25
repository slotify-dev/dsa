/**
 * Insertion Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n) - when the array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²) - when the array is sorted in reverse order
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Characteristics:
 * - Simple implementation
 * - Efficient for small data sets or nearly sorted data
 * - Stable sort (preserves relative order of equal elements)
 * - Adaptive (performs better on partially sorted arrays)
 * - In-place algorithm (requires constant extra space)
 * 
 * @param arr - The array to be sorted
 * @param comparator - Optional function to compare elements
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of numbers
 * insertion([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 * 
 * @example
 * // Sort an array of objects by a property
 * insertion(
 *   [{name: 'John', age: 25}, {name: 'Jane', age: 20}],
 *   (a, b) => a.age - b.age
 * ); // returns [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
 */
export default function insertion<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  const n = arr.length;
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Store the current element to be compared
    const key = arr[i];
    
    // Move elements of arr[0..i-1] that are greater than key
    // to one position ahead of their current position
    let j = i - 1;
    while (j >= 0 && comparator(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Place the key in its correct position
    arr[j + 1] = key;
  }
  
  return arr;
}