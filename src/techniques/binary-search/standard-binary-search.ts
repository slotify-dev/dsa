/**
 * Standard binary search implementation to find a target value in a sorted array.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A sorted array of numbers
 * @param target - The value to search for
 * @returns The index of the target if found, otherwise -1
 * 
 * @example
 * // Find the index of 7 in a sorted array
 * standardBinarySearch([1, 2, 3, 5, 7, 9], 7); // returns 4
 * 
 * @example
 * // Search for a value that doesn't exist
 * standardBinarySearch([1, 2, 3, 5, 7, 9], 6); // returns -1
 */
export default function standardBinarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] === target) {
      return mid; // Target found
    } else if (nums[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  
  return -1; // Target not found
}