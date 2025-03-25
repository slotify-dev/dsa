/**
 * Finds the index where a target should be inserted in a sorted array to maintain order.
 * If the target already exists, returns the index of the target.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A sorted array of numbers
 * @param target - The target value
 * @returns The index where the target should be inserted
 * 
 * @example
 * // Find where to insert 5
 * searchInsertPosition([1, 3, 6, 7], 5); // returns 2
 * 
 * @example
 * // Find where to insert 0
 * searchInsertPosition([1, 3, 6, 7], 0); // returns 0
 * 
 * @example
 * // Find where to insert 8
 * searchInsertPosition([1, 3, 6, 7], 8); // returns 4
 */
export default function searchInsertPosition(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  // At this point, left > right
  // 'left' is the position where the target should be inserted
  return left;
}