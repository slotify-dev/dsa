/**
 * Finds the index of the first element in a sorted array that is strictly greater than the target.
 * This is equivalent to the C++ upper_bound function.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A sorted array of numbers
 * @param target - The target value
 * @returns The index of the first element > target, or nums.length if no such element exists
 * 
 * @example
 * // Find the first element > 5
 * upperBound([1, 3, 5, 5, 5, 7, 9], 5); // returns 5
 * 
 * @example
 * // Find the first element > 6
 * upperBound([1, 3, 5, 5, 5, 7, 9], 6); // returns 5
 * 
 * @example
 * // Find the first element > 9
 * upperBound([1, 3, 5, 5, 5, 7, 9], 9); // returns 7
 */
export default function upperBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}