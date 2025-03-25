/**
 * Searches for a target value in a rotated sorted array.
 * A rotated sorted array is a sorted array that has been rotated at some pivot point.
 * For example, [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A rotated sorted array of numbers with no duplicates
 * @param target - The target value
 * @returns The index of the target if found, otherwise -1
 * 
 * @example
 * // Find 0 in a rotated array
 * searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0); // returns 4
 * 
 * @example
 * // Find 3 in a rotated array
 * searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3); // returns -1
 */
export default function searchRotatedArray(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // Check if the left half is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is in the left half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Right half is sorted
    else {
      // Check if target is in the right half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1; // Target not found
}