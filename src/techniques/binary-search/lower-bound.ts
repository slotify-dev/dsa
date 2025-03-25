/**
 * Finds the index of the first element in a sorted array that is greater than or equal to the target.
 * This is equivalent to the C++ lower_bound function.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A sorted array of numbers
 * @param target - The target value
 * @returns The index of the first element >= target, or nums.length if no such element exists
 * 
 * @example
 * // Find the first element >= 5
 * lowerBound([1, 3, 5, 5, 5, 7, 9], 5); // returns 2
 * 
 * @example
 * // Find the first element >= 6
 * lowerBound([1, 3, 5, 5, 5, 7, 9], 6); // returns 5
 * 
 * @example
 * // Find the first element >= 10
 * lowerBound([1, 3, 5, 5, 5, 7, 9], 10); // returns 7
 */
export default function lowerBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}