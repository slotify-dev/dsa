/**
 * Radix Sort Implementation
 * 
 * Time Complexity:
 * - Best Case: O(nk) where k is the number of digits in the largest number
 * - Average Case: O(nk)
 * - Worst Case: O(nk)
 * 
 * Space Complexity: O(n + k) where k is the range of a digit (usually 10)
 * 
 * Characteristics:
 * - Not a comparison-based sort
 * - Stable sort (preserves relative order of equal elements)
 * - Works well for fixed-length integers
 * - Uses counting sort as a subroutine
 * 
 * @param arr - The array of non-negative integers to be sorted
 * @returns The sorted array (same reference as input)
 * 
 * @example
 * // Sort an array of non-negative integers
 * radix([170, 45, 75, 90, 802, 24, 2, 66]); // returns [2, 24, 45, 66, 75, 90, 170, 802]
 */
export default function radix(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  
  // Find the maximum number to know the number of digits
  const max = Math.max(...arr);
  
  // Do counting sort for every digit
  // Instead of passing digit number, pass exponent
  // exp is 10^i where i is the current digit number
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

/**
 * A modified counting sort that sorts the elements based on a specific digit
 * 
 * @param arr - The array to be sorted
 * @param exp - The current digit place value (1, 10, 100, etc.)
 */
function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that count[i] contains the position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy the output array to arr[] so that arr[] contains sorted numbers
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}