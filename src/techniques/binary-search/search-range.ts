/**
 * Finds the starting and ending position of a target value in a sorted array.
 * This is equivalent to finding the first and last occurrence of the target.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param nums - A sorted array of numbers
 * @param target - The target value
 * @returns An array containing the starting and ending positions, or [-1, -1] if not found
 * 
 * @example
 * // Find the range of 5
 * searchRange([1, 3, 5, 5, 5, 7, 9], 5); // returns [2, 4]
 * 
 * @example
 * // Find the range of 6
 * searchRange([1, 3, 5, 5, 5, 7, 9], 6); // returns [-1, -1]
 */
export default function searchRange(nums: number[], target: number): [number, number] {
  const findFirst = (): number => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      
      if (nums[mid] >= target) {
        right = mid - 1;
        if (nums[mid] === target) {
          result = mid;
        }
      } else {
        left = mid + 1;
      }
    }
    
    return result;
  };
  
  const findLast = (): number => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      
      if (nums[mid] <= target) {
        left = mid + 1;
        if (nums[mid] === target) {
          result = mid;
        }
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  };
  
  return [findFirst(), findLast()];
}