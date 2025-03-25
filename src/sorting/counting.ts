/**
 * Counting Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(n + k) where k is the range of input
 * - Average Case: O(n + k)
 * - Worst Case: O(n + k)
 * 
 * Space Complexity: O(n + k)
 * 
 * Characteristics:
 * - Not a comparison-based sort
 * - Stable sort (preserves relative order of equal elements)
 * - Efficient when the range of input values (k) is not significantly larger than the number of elements (n)
 * - Only works for non-negative integers or data that can be mapped to integers
 * 
 * @param arr - The array of non-negative integers to be sorted
 * @returns A new sorted array
 * 
 * @example
 * // Sort an array of non-negative integers
 * counting([5, 3, 8, 4, 2]); // returns [2, 3, 4, 5, 8]
 */
export default function counting(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  // Find the maximum value in the array
  const max = Math.max(...arr);
  
  // Create a counting array of size max+1
  const count = new Array(max + 1).fill(0);
  
  // Count occurrences of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  
  // Update count array to store the position of each element
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Create the output array
  const output = new Array(arr.length);
  
  // Build the output array
  // Traverse the input array from end to maintain stability
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
}